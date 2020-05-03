import { IMock, Mock, Times, It } from "typemoq-continued";
import { IRepository, IResult, IToasterService } from "@fibre/types";
import { assert } from "chai";
import { Push } from "../src/push";

describe("In the Push script", () => {

	let subject: Push | undefined;

	let toasterService: IMock<IToasterService>;

	beforeEach(() => {
		subject = undefined;

		toasterService = Mock.ofType<IToasterService>();
	});

	describe("run", () => {

		it("should call push on each repository passed in", async () => {
			given_subject_isInstantiated();

			const repo1: IMock<IRepository> = Mock.ofType<IRepository>();
			const repo2: IMock<IRepository> = Mock.ofType<IRepository>();
			const repo3: IMock<IRepository> = Mock.ofType<IRepository>();

			await subject?.run([ repo1.object, repo2.object, repo3.object ]);

			repo1.verify(r => r.push(), Times.once());
			repo2.verify(r => r.push(), Times.once());
			repo3.verify(r => r.push(), Times.once());
		});

		[
			[ { push: () => {} } ],
			[ { push: () => {} }, { push: () => {} } ],
			[ { push: () => {} }, { push: () => {} }, { push: () => {} } ]
		].forEach(collection => it("should call success on the toaster service for each repository where there is "
			+ collection.length, async () => {
			given_subject_isInstantiated();

			await subject?.run(collection as any[]);

			toasterService.verify(t => t.success(It.isAny(), It.isAny(), It.isAny()), Times.exactly(collection.length));
		}));

		[
			[ { push: () => {} } ],
			[ { push: () => {} }, { push: () => {} } ],
			[ { push: () => {} }, { push: () => {} }, { push: () => {} } ]
		].forEach(collection => it("should call success on the toaster service with the title placeholder for each repository where there is "
			+ collection.length, async () => {
			given_subject_isInstantiated();

			await subject?.run(collection as any[]);

			toasterService.verify(t => t.success("SuccessToasterTitle", It.isAny(), It.isAny()), Times.exactly(collection.length));
		}));

		[
			[ { push: () => {} } ],
			[ { push: () => {} }, { push: () => {} } ],
			[ { push: () => {} }, { push: () => {} }, { push: () => {} } ]
		].forEach(collection => it("should call success on the toaster service with the message placeholder for each repository where there is "
			+ collection.length, async () => {
			given_subject_isInstantiated();

			await subject?.run(collection as any[]);

			toasterService.verify(t => t.success(It.isAny(), "SuccessToasterMessage", It.isAny()), Times.exactly(collection.length));
		}));

		[
			[ { push: () => {}, name: "name1.1" } ],
			[ { push: () => {}, name: "name2.1" }, { push: () => {}, name: "name2.2" } ],
			[ { push: () => {}, name: "name3.1" }, { push: () => {}, name: "name3.2" }, { push: () => {}, name: "name3.3" } ]
		].forEach(collection => it("should call success on the toaster service with the repository name arg for each repository where there is "
			+ collection.length, async () => {
			given_subject_isInstantiated();

			await subject?.run(collection as any[]);

			collection.forEach(c => {
				toasterService.verify(t => t.success(It.isAny(), It.isAny(), It.is(i => i.repoName === c.name)), Times.once());
			});
		}));

		it("should return an IResult with success: true", async () => {
			given_subject_isInstantiated();

			const result: IResult | undefined = await subject?.run([]);

			assert.deepStrictEqual(result, { success : true });
		});
	});

	function given_subject_isInstantiated(): void {
		subject = new Push(toasterService.object);
	}
});
