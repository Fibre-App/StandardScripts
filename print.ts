import { Script, IScript, IResult, IRepository, IChangeSet } from "d:/Users/tobys/Repositories/University/Fibre/StandardScripts/node_modules/@fibre/types/dist/index";

@Script("print")
export class Print implements IScript {
	async run(repositories: IRepository[]): Promise<IResult> {
		
		for (const repository of repositories) {
			const commits: IChangeSet[] = repository.changesets

			for (const commit of commits) {
				console.log(commit.message);
			}
		}

		return { success: true };
	}
}