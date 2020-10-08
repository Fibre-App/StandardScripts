import { Script, IScript, IResult, IRepository, IToasterService, Inject, A } from "@fibre/types";

@Script({
  label: "push",
  tooltip: "Pushes changes to the origin",
  ionIcon: "arrowUpOutline",
  translations: {
    "en-gb": {
      SuccessToasterTitle: "Pushed!",
      SuccessToasterMessage: "Successfully pushed ${repoName}"
    }
  }
})
export class Push implements IScript {
  constructor(@Inject(A.ToasterService) private readonly toasterService: IToasterService) {}

  public async run(repositories: IRepository[]): Promise<IResult> {
    for (const repository of repositories) {
      await repository.push();
      this.toasterService.success("SuccessToasterTitle", "SuccessToasterMessage", { repoName: repository.name });
    }

    return { success: true };
  }
}
