import { Script, IScript, IResult, IRepository } from "@fibre/types";

@Script({
	label: "push",
	tooltip: "Pushes changes to the origin",
	ionIcon : "arrowUpOutline"
})
export class Push implements IScript {

	public async run(repositories: IRepository[]): Promise<IResult> {

		for (const repository of repositories) {
			await repository.push();
		}

		return { success: true };
	}
}
