
var mainOptions = [
    {"label": "医院沟通详情", "value":0, "path":"/hospital"},
    {"label": "需求管理详情", "value":1, "path":"/project"},
    {"label": "任务记录详情", "value":2, "path":"/task"}
]

//完成情况
var completeOptions = [
    {"label": "完成", "value":0},
    {"label": "进行中", "value":1},
    {"label": "项目终止", "value":2}
];

//外部
var dqForm = {
    id: 0,
    actualTimeConsuming: 0,
    startTime: "",
    endTime: "",
    completeSituation: 1,
    projectType: 0,
    projectName: "",
    projectPerson: "",
    achievePerson: "",
    projectFee: 0,
    receipt: 0,
    actualFee: 0
};

//内部
var dqDeatialForm = {
    id: 0,
    projectId: 0,
    commPerson: 0, //
    projectDetails: "",
    type: 0,
    startTime:"",
    aboutTimeConsuming: 0,
    aboutEndTime: "",
    endTime:"",
    operationTimeConsuming: 0,
    actualTimeConsuming: 0,
    completeSituation: 1,
    resultData: "",
    firstMark: 0,
    score: 0,
    scorePerson: "",
    fileName: ""
};

export{
    dqForm, dqDeatialForm, mainOptions, completeOptions
}