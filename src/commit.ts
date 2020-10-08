import { Script, IScript, IResult, IRepository, Inject, A, IDialogService, IToasterService } from "@fibre/types";

@Script({
  label: "commit",
  tooltip: "Commits all staged changes",
  ionIcon: "gitCommitOutline",
  translations: {
    "en-gb": {
      SuccessToasterTitle: "Committed!",
      SuccessToasterMessage: "Successfully committed ${repoName}"
    }
  }
})
export class Commit implements IScript {
  constructor(
    @Inject(A.DialogService) private readonly dialogService: IDialogService,
    @Inject(A.ToasterService) private readonly toasterService: IToasterService
  ) {}

  public async run(repositories: IRepository[]): Promise<IResult> {
    const message: string = await this.dialogService.openSingleLineDialog(
      "Committing",
      "Enter a commit message",
      "WIP"
    );

    for (const repository of repositories) {
      await repository.commit(message);
      this.toasterService.success("SuccessToasterTitle", "SuccessToasterMessage", { repoName: repository.name });
    }

    return { success: true };
  }
}
