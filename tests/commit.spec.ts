import { describe } from "mocha";
import { IMock, Mock, It, Times } from "typemoq-continued";
import { assert } from "chai";
import { IDialogService, IRepository, IResult, IToasterService } from "@fibre/types";
import { Commit } from "../src/commit";

describe("In the Commit script", () => {
  let subject: Commit | undefined;

  let dialogService: IMock<IDialogService>;
  let toasterService: IMock<IToasterService>;

  beforeEach(() => {
    subject = undefined;

    dialogService = Mock.ofType<IDialogService>();
    toasterService = Mock.ofType<IToasterService>();
  });

  describe("run", () => {
    it("should open a single line dialog", async () => {
      given_subject_isInstantiated();

      await subject?.run([]);

      dialogService.verify(d => d.openSingleLineDialog(It.isAny(), It.isAny(), It.isAny()), Times.once());
    });

    it("should open a single line dialog with the title: Committing", async () => {
      given_subject_isInstantiated();

      await subject?.run([]);

      dialogService.verify(d => d.openSingleLineDialog("Committing", It.isAny(), It.isAny()), Times.once());
    });

    it("should open a single line dialog with the message: Enter a commit message", async () => {
      given_subject_isInstantiated();

      await subject?.run([]);

      dialogService.verify(d => d.openSingleLineDialog(It.isAny(), "Enter a commit message", It.isAny()), Times.once());
    });

    it("should open a single line dialog with the default reasult: WIP", async () => {
      given_subject_isInstantiated();

      await subject?.run([]);

      dialogService.verify(d => d.openSingleLineDialog(It.isAny(), It.isAny(), "WIP"), Times.once());
    });

    it("should call commit on each repository passed in", async () => {
      given_subject_isInstantiated();

      const repo1: IMock<IRepository> = Mock.ofType<IRepository>();
      const repo2: IMock<IRepository> = Mock.ofType<IRepository>();
      const repo3: IMock<IRepository> = Mock.ofType<IRepository>();

      await subject?.run([repo1.object, repo2.object, repo3.object]);

      repo1.verify(r => r.commit(It.isAny()), Times.once());
      repo2.verify(r => r.commit(It.isAny()), Times.once());
      repo3.verify(r => r.commit(It.isAny()), Times.once());
    });

    it("should call commit on each repository passed in with the result returned from the single line dialog", async () => {
      const commitMessage: string = "This gets returned from the dialog service";

      given_subject_isInstantiated();
      given_dialogService_openSingleLineDialog_returns(commitMessage);

      const repo1: IMock<IRepository> = Mock.ofType<IRepository>();
      const repo2: IMock<IRepository> = Mock.ofType<IRepository>();
      const repo3: IMock<IRepository> = Mock.ofType<IRepository>();

      await subject?.run([repo1.object, repo2.object, repo3.object]);

      repo1.verify(r => r.commit(commitMessage), Times.once());
      repo2.verify(r => r.commit(commitMessage), Times.once());
      repo3.verify(r => r.commit(commitMessage), Times.once());
    });

    [
      [{ commit: (message: string) => {} }],
      [{ commit: (message: string) => {} }, { commit: (message: string) => {} }],
      [{ commit: (message: string) => {} }, { commit: (message: string) => {} }, { commit: (message: string) => {} }]
    ].forEach(collection =>
      it(
        "should call success on the toaster service for each repository where there is " + collection.length,
        async () => {
          given_subject_isInstantiated();

          await subject?.run(collection as any[]);

          toasterService.verify(t => t.success(It.isAny(), It.isAny(), It.isAny()), Times.exactly(collection.length));
        }
      )
    );

    [
      [{ commit: (message: string) => {} }],
      [{ commit: (message: string) => {} }, { commit: (message: string) => {} }],
      [{ commit: (message: string) => {} }, { commit: (message: string) => {} }, { commit: (message: string) => {} }]
    ].forEach(collection =>
      it(
        "should call success on the toaster service with the title placeholder for each repository where there is " +
          collection.length,
        async () => {
          given_subject_isInstantiated();

          await subject?.run(collection as any[]);

          toasterService.verify(
            t => t.success("SuccessToasterTitle", It.isAny(), It.isAny()),
            Times.exactly(collection.length)
          );
        }
      )
    );

    [
      [{ commit: (message: string) => {} }],
      [{ commit: (message: string) => {} }, { commit: (message: string) => {} }],
      [{ commit: (message: string) => {} }, { commit: (message: string) => {} }, { commit: (message: string) => {} }]
    ].forEach(collection =>
      it(
        "should call success on the toaster service with the message placeholder for each repository where there is " +
          collection.length,
        async () => {
          given_subject_isInstantiated();

          await subject?.run(collection as any[]);

          toasterService.verify(
            t => t.success(It.isAny(), "SuccessToasterMessage", It.isAny()),
            Times.exactly(collection.length)
          );
        }
      )
    );

    [
      [{ commit: (message: string) => {}, name: "name1.1" }],
      [
        { commit: (message: string) => {}, name: "name2.1" },
        { commit: (message: string) => {}, name: "name2.2" }
      ],
      [
        { commit: (message: string) => {}, name: "name3.1" },
        { commit: (message: string) => {}, name: "name3.2" },
        { commit: (message: string) => {}, name: "name3.3" }
      ]
    ].forEach(collection =>
      it(
        "should call success on the toaster service with the repository name arg for each repository where there is " +
          collection.length,
        async () => {
          given_subject_isInstantiated();

          await subject?.run(collection as any[]);

          collection.forEach(c => {
            toasterService.verify(
              t =>
                t.success(
                  It.isAny(),
                  It.isAny(),
                  It.is(i => i.repoName === c.name)
                ),
              Times.once()
            );
          });
        }
      )
    );

    it("should return an IResult with success: true", async () => {
      given_subject_isInstantiated();

      const result: IResult | undefined = await subject?.run([]);

      assert.deepStrictEqual(result, { success: true });
    });
  });

  function given_subject_isInstantiated(): void {
    subject = new Commit(dialogService.object, toasterService.object);
  }

  function given_dialogService_openSingleLineDialog_returns(returns: string): void {
    dialogService.setup(d => d.openSingleLineDialog(It.isAny(), It.isAny(), It.isAny())).returns(async () => returns);
  }
});
