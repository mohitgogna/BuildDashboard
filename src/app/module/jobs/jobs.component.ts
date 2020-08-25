import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModuleService } from '../module.service';
import { Build, Jobs } from '../../model/Build';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  currentBuild: string = "All Jobs";
  currentBuildId: number = 0;
  builds: Build[] = [];
  url: string;
  constructor(private moduleService: ModuleService, private route: ActivatedRoute, private router: Router) {
    console.log("jobs called");
  }

  ngOnInit(): void {
    this.url = this.route.snapshot.queryParamMap.get('url');
    this.currentBuild = this.route.snapshot.queryParamMap.get('name');

    console.log(this.url);
    console.log(this.currentBuild);

    this.moduleService.getJenkinsJobDetail(this.url).
      subscribe((item: Jobs) => {
        //console.log(item);
        this.setJobRun(item);
        this.currentBuild = this.currentBuild;

        this.moduleService.getJenkinsJobLogs(this.currentBuild, this.currentBuildId).
          subscribe((item: string) => {
            //console.log(item);
          })


      });



  }


  setJobRun(myData): void {

    let jobRuns = JSON.parse(myData);
    this.currentBuildId = jobRuns[0].id;
    let obj = jobRuns[0].stages;

    console.log(obj);

    if (jobRuns[0].stages.length == 0) {
      alert("Not Executed");
      return;
    }


    this.builds = [];

    console.log("ID is");
    console.log(this.currentBuildId);

    for (let i = 0; i < obj.length; i++) {
      this.builds.push(
        {
          Name: obj[i].name,
          Id: "",
          Status: "",
          Info: obj[i].status,
          Version: this.timeConverter(obj[i].startTimeMillis),
          Time: this.milliSecondToSecond(obj[i].durationMillis),
          Link1: "",
          Link2: "",
          Link3: "",
          Progress: "",
          _class: obj[i]._class,
          url: obj[i].url,
          color: this.moduleService.getStageStatusColor(obj[i].status)
        }
      );
    }

  }

  timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;

    return time;
  }

  milliSecondToSecond(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    //return hrs + ':' + mins + ':' + secs + '.' + ms;
    return mins + ' min ' + secs + ' sec ' + ms + ' ms';
  }

}
