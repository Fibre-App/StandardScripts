import { Script, IScript, IResult, IRepository } from "d:/Users/tobys/Repositories/University/Fibre/StandardScripts/node_modules/@fibre/types/dist/index";

@Script("push")
export class Push implements IScript {

	public async run(repositories: IRepository[]): Promise<IResult> {

		for (const repository of repositories) {
			await repository.push();
		}

		return { success: true };
	}
}