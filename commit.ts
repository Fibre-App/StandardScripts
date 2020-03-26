import { Script, IScript, IResult, IRepository } from "d:/Users/tobys/Repositories/University/Fibre/StandardScripts/node_modules/@fibre/types/dist/index";

@Script("commit")
export class commit implements IScript {
	
	public async run(repositories: IRepository[]): Promise<IResult> {

		const message = "This is a commit message";// TODO Needs to come from dialog service
		
		for (const repository of repositories) {
			await repository.commit(message);
		}

		return { success: true };
	}
}