import { Injectable } from '@angular/core';
import { Build, Jobs } from '../model/Build';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  builds: Build[] = [];

  httpOptions = {
    headers: new HttpHeaders(
      {
        'Authorization': 'Basic MzEwMjc5Nzk2OkNndGFfYmxyQDEyMw==',
        //'Access-Control-Allow-Origin': '*'
      }
    )
  }

  constructor(private httpClient: HttpClient) { }

  getBuilds(): Build[] {
    // for (let i = 0; i < 10; i++) {
    //   this.builds.push({
    //     Id: i.toString(),
    //     Name: "Pipeline " + i,
    //     Status: "Passed",
    //     Info: "This is build information of build " + i,
    //     Version: "v1.1." + i,
    //     Time: i + "m 24s",
    //     Link1: "#",
    //     Link2: "#" + i,
    //     Link3: "#",
    //     Progress: "10" + i
    //   });
    // }

    return this.builds;
  }

  getJenkinsBuild() {

    let configUrl = "http://localhost:49939/api/kpiData/GetApi?url=api/json";
    return this.httpClient.get(configUrl, this.httpOptions);
    //console.log(this.data);
  }

  getJenkinsJobDetail(url) {
    let configUrl = "http://localhost:49939/api/kpiData/GetJobRun?url=" + url + "wfapi/runs";
    return this.httpClient.get(configUrl, this.httpOptions);
    //console.log(this.data);
  }

  getJenkinsJobLogs(jobName, JobBuildId) {
    let configUrl = "http://localhost:49939/api/kpiData/GetLogs?url=job/" + jobName + "/" + JobBuildId + "/logText/progressiveText?start=0";
    return this.httpClient.get(configUrl, this.httpOptions);
    //console.log(this.data);
  }

  getBuildInfo(_class): string {
    if (_class == "org.jenkinsci.plugins.workflow.job.WorkflowJob") {
      return "WorkflowJob";
    } else if (_class == "hudson.model.FreeStyleProject") {
      return "FreeStyleProject";
    } else {
      return "";
    }
  }

  getBuidStatus(color): string {
    if (color == "red") {
      return "Failed";
    } else if (color == "blue") {
      return "Pass";
    } else if (color == "notbuilt") {
      return "Not Built";
    } else if (color == "blue_anime") {
      return "In Progress";
    } else if (color == "red_anime") {
      return "In Progress";
    } else {
      return "No Status";
    }

  }

  getDashboardColor(color): string {
    if (color == "red") {
      return "red";
    } else if (color == "blue") {
      return "dardgreen";
    } else if (color == "notbuilt") {
      return "grey";
    } else if (color == "blue_anime") {
      return "#ffff00e3";
    } else if (color == "red_anime") {
      return "#ffff00e3";
    } else {
      return "blue";
    }

  }

  getStageStatusColor(status): string {
    if (status == "SUCCESS") {
      return "dardgreen";
    } else if (status == "FAILED") {
      return "red";
    } else if (status == "IN_PROGRESS") {
      return "#ffff00e3";
    } else {
      return "grey";
    }

  }

  shortName(name: string) {
    console.log(name.length);

    if (name.length > 15) {
      return name.substring(0, 15)+"...";
    }
    return name;
  }

}
