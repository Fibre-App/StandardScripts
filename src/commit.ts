import { Script, IScript, IResult, IRepository, Inject, A, IDialogService } from "@fibre/types";

@Script("commit")
export class Commit implements IScript {

	constructor(@Inject(A.DialogService) private readonly dialogService: IDialogService) { }

	public async run(repositories: IRepository[]): Promise<IResult> {

		const message: string = await this.dialogService.openSingleLineDialog("Committing", "Enter a commit message", "WIP");

		for (const repository of repositories) {
			await repository.commit(message);
		}

		return { success: true };
	}
}
