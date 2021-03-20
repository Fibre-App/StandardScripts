import {
  Script,
  IScript,
  IResult,
  IRepository,
  Inject,
  A,
  IDialogService,
  IToasterService
} from "@fibre/types";

@Script({
  label: "Commit",
  tooltip: "Commits all staged changes",
  ionIcon: "gitCommitOutline"
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
      this.toasterService.success("Committed!", `Successfully committed ${repository.name}`);
    }

    return { success: true };
  }
}
