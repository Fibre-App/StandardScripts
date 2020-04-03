import { IMock, Mock, Times } from "typemoq";
import { IRepository, IResult } from "@fibre/types";
import { assert } from "chai";
import { Push } from "../src/push";

describe("In the Push script", () => {

	let subject: Push | undefined;

	beforeEach(() => {
		subject = undefined;
	});

	describe("run", () => {

		it("should call push on each repository passed in", async () => {
			given_subject_isInstantiated();

			const repo1: IMock<IRepository> = Mock.ofType<IRepository>();
			const repo2: IMock<IRepository> = Mock.ofType<IRepository>();
			const repo3: IMock<IRepository> = Mock.ofType<IRepository>();

			await subject?.run([ repo1.object, repo2.object, repo3.object ]);

			repo1.verify(r => r.push(), Times.once());
			repo2.verify(r => r.push(), Times.once());
			repo3.verify(r => r.push(), Times.once());
		});

		it("should return an IResult with success: true", async () => {
			given_subject_isInstantiated();

			const result: IResult | undefined = await subject?.run([]);

			assert.deepStrictEqual(result, { success : true });
		});
	});

	function given_subject_isInstantiated(): void {
		subject = new Push();
	}
});
