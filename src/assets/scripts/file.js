
var options01 = [
    {"name": "单选01", "value":0},
    {"name": "单选02", "value":1},
    {"name": "单选03", "value":2}
]


var options02 = [
    {"name": "多选01", "value":0},
    {"name": "多选02", "value":1},
    {"name": "多选03", "value":2},
    {"name": "多选04", "value":3},
    {"name": "多选05", "value":4},
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
    options01, options02, mainOptions, completeOptions
}