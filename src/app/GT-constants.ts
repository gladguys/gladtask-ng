import {environment} from "../environments/environment";

export class GTConstants {

	//Upload Related
	static readonly GLADTASK_UPLOAD_PATH: string = environment.API + "/file/upload";
	static readonly AWS_BUCKET: string = "gladtask";
	static readonly AWS_PROFILE_PIC_FOLDER: string = "profile-pic";
	static readonly AWS_PROJECT_PIC_FOLDER: string = "project-pic";
	static readonly AWS_DOCS_TASK_FOLDER: string = "docs-task";
	static readonly BASE_FILE_PATH: string = "https://s3.amazonaws.com" + "/" + GTConstants.AWS_BUCKET;
}
