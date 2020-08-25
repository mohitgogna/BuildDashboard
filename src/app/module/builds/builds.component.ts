import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router'
import { Build, Jobs } from '../../model/Build';
import { ModuleService } from '../module.service';

@Component({
  selector: 'app-builds',
  templateUrl: './builds.component.html',
  styleUrls: ['./builds.component.css']
})
export class BuildsComponent implements OnInit {

  searchText = "Build Search";
  currentBuild: string = "All Jobs";
  builds: Build[] = [];
  allBuilds: Build[] = [];

  constructor(private moduleService: ModuleService, private router: Router) {
    console.log("constructor");
  }

  ngOnInit(): void {
    console.log("ngOnInit");
    //this.builds = this.moduleService.getBuilds();
    this.moduleService.getJenkinsBuild().
      subscribe((item: Jobs) => {
        this.setData(item);
      });

  }

  setData(myData): void {
    let obj = JSON.parse(myData);

    console.log(obj);

    for (let i = 0; i < obj.length; i++) {
      this.builds.push(
        {
          Name: this.moduleService.shortName(obj[i].name),
          Id: "",
          Status: "",
          Info: this.moduleService.getBuildInfo(obj[i]._class),
          Version: this.moduleService.getBuidStatus(obj[i].color),
          Time: "",
          Link1: obj[i].url,
          Link2: "",
          Link3: "",
          Progress: "",
          _class: obj[i]._class,
          url: obj[i].url,
          color: this.moduleService.getDashboardColor(obj[i].color)
        }
      );
    }

    this.allBuilds = this.builds;
    //this.builds = this.builds.filter(item => item.Name.indexOf("demo") > -1);

    // this.builds = this.builds.filter(function (item) {
    //   return item.Name.indexOf("demo") > -1;
    // });
  }


  onBlockClick(myData) {

    console.log(myData);
    if (myData._class != "org.jenkinsci.plugins.workflow.job.WorkflowJob") {
      alert("It's a freestyle project not a Pipeline." + myData._class);
      return;
    }

    if (myData.color == "notbuilt") {
      alert("Not Built Yet");
      return;
    }

    //in below line actual url should be replaced
    let str = myData.Link1.replace("http://10.10.10.10:8080", "");
    console.log(str);

    //this.router.navigate(['/jobs',{url:str}]);
    //this.router.navigate(['/jobs']);
    //this.router.navigate(['/jobs',str]);
    this.router.navigate(['/jobs'], { queryParams: { url: str, name: myData.Name } });

    console.log("navigated");

    // this.moduleService.getJenkinsJobDetail(str).
    //   subscribe((item: Jobs) => {
    //     //console.log(item);
    //     this.setJobRun(item);
    //     this.currentBuild = myData.Name;
    //   });






  }

  searchChanged() {

    let search = this.searchText;
    if (search == "") {
      this.builds = this.allBuilds;
    }
    this.builds = this.allBuilds.filter(function (item) {
      return item.Name.indexOf(search) > -1;
    });
    console.log(this.searchText);
    console.log(this.builds);
    //console.log(x);

    // this.builds = this.builds.filter(function (item) {
    //   return item.Name.indexOf("demo") > -1;
    // });
  }



}
