import { Script, IScript, IResult, IRepository, Inject, A, IDialogService } from "d:/Users/tobys/Repositories/University/Fibre/StandardScripts/node_modules/@fibre/types/dist/index";

@Script("commit")
export class commit implements IScript {

	constructor(@Inject(A.DialogService) private readonly dialogService: IDialogService) { }
	
	public async run(repositories: IRepository[]): Promise<IResult> {

		const message = await this.dialogService.openSingleLineDialog("Committing", "Enter a commit message", "WIP");

		for (const repository of repositories) {
			await repository.commit(message);
		}

		return { success: true };
	}
}