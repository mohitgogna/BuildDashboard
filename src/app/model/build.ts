export interface Build {
    Id: string;
    Name: string;
    Status: string;
    Info: string;
    Version: string;
    Time: string;
    Link1: string;
    Link2: string;
    Link3: string;
    Progress: string;
    
    _class: string;
    url: string;
    color: string;
}

export interface Jobs {
    _class: string;
    name: string;
    url: string;
    color: string;

}

export interface Application {
    _class: string;
    description: string;
    jobs: Jobs[];
    name: string;
    property: string[];
    url: string;

}