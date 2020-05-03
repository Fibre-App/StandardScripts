import { Script, IScript, IResult, IRepository, Inject, A, IToasterService } from "@fibre/types";

@Script({
	label: "pull",
	tooltip: "Pulls changes from the origin",
	ionIcon : "arrowDownOutline",
	translations: {
		"en-gb": {
			SuccessToasterTitle: "Pulled!",
			SuccessToasterMessage: "Successfully pulled ${repoName}",
		}
	}
})
export class Pull implements IScript {

	constructor(@Inject(A.ToasterService) private readonly toasterService: IToasterService) { }

	public async run(repositories: IRepository[]): Promise<IResult> {

		for (const repository of repositories) {
			await repository.pull();
			this.toasterService.success("SuccessToasterTitle", "SuccessToasterMessage", { repoName: repository.name });
		}

		return { success: true };
	}
}
