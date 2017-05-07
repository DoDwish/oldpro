const data = [
  {
    url: '/api/expert_user/verify_code',
    data: {
      status: {
        code: 0,
        msg: 'request success'
      }
    }
  }, {
    url: 'api/expert_user/verify',
    data: {
      "status": {
        "code": 0,
        "msg": "request success"
      },
      "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWFsbSI6Im1hbmFnZW1lbnQtdXNlciIsImlhdCI6MTQ4NDYxODgyNiwiZXhwIjoxNDg0NjI2MDI2LCJzdWIiOiI1ODc4ODk0MDAzMjlmMzFlMjNkOWVmMjQiLCJqdGkiOiI1ODdkN2M0YTA4YzdhZGU5MTZkMjQzMDIifQ.wlV9u9diWGZDqV2r5Uk0GBRz4bkXtn-7-u0qHSqx-W4"
      }
    }
  }, {
    url: '/api/expert_user/set_password',
    data: {
      status: {
        code: 0,
        msg: 'request success'
      }
    }
  }, {
    url: 'api/expert_user/login',
    data: {
      "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWFsbSI6Im1hbmFnZW1lbnQtdXNlciIsImlhdCI6MTQ4NDYxODgyNiwiZXhwIjoxNDg0NjI2MDI2LCJzdWIiOiI1ODc4ODk0MDAzMjlmMzFlMjNkOWVmMjQiLCJqdGkiOiI1ODdkN2M0YTA4YzdhZGU5MTZkMjQzMDIifQ.wlV9u9diWGZDqV2r5Uk0GBRz4bkXtn-7-u0qHSqx-W4",
        "user": {
          "_id": "589a94c0231e0f192d223b9c",
          "accountId": "123456789",
          "name": "小明",
          "tel": "10086",
          "email": "foo@bar.com",
          "identityCardIcon": "https://www.baidu.com/",
          "identityCardNum": "440712321412415123123",
          "school": {
            "_id": "589a94c0231e0f192d223b9c",
            "name": "成人中学",
            "schoolType": 2,
            "chargingLicense": "",
            "legalPersonName": "",
            "phone": "",
            "region": {
              "province": "广东省",
              "city": "广州市",
              "area": "海珠区"
            },
            "address": "某一天桥底下",
            "status": 1,
            "createdBy": "589a94c0231e0f192d223b9c",
            "createdAt": "2017-02-08T03:40:47.834Z",
            "updatedAt": "2017-02-08T03:40:47.834Z"
          },
          "status": 1,
          "role": {
            "_id": "587dd51ef47773b38b66b48b",
            "name": "运维人员",
            "createdAt": "2017-01-21T16:11:25.973Z",
            "permissions": []
          },
          "createdBy": "589a94c0231e0f192d223b9c",
          "createdAt": "2017-02-08T03:40:47.834Z",
          "updatedAt": "2017-02-08T03:40:47.834Z"
        }
      },
      "status": {
        "code": 0,
        "msg": "request success"
      }
    }
  }, {
    url: 'api/auth/expert_user/change_password',
    data: {
      "status": {
        "code": 0,
        "msg": "request success"
      }
    }
  }, {
    url: '/api/auth/expert_user',
    data: {
      "data": [
        {
          "_id": "587889400329f31e23d9ef29",
          "accountId": "账号",
          "name": "名字",
          "tel": "13800138000",
          "email": "expert@163.com",
          "password": "1234567890",
          "identityCardIcon": "http://zhappian.com",
          "identityCardNum": "44010xxxxxxxxxxxx",
          "expertTeam": {
            "_id": "587889400329f31e23d9ef24",
            "name": "阿斯",
            "expertType": 1,
            "region": {
              "province": "广东省",
              "city": "广州市",
              "area": "天河区"
            },
            "address": "建中路8号",
            "status": 1
          },
          "role": {
            "_id": "587dd51ef47773b38b66b48b",
            "name": "运维人员",
            "createdAt": "2017-01-21T16:11:25.973Z",
            "permissions": []
          },
          "status": 1,
          "createdBy": "587889400329f31e23d9ef26",
          "createdAt": "2017-02-07T07:35:26.126Z",
          "updatedAt": "2017-02-07T07:35:26.126Z"
        }
      ],
      "status": {
        "code": 0,
        "msg": "request success"
      }
    }
  }, {
    url: '/api/auth/expert_user/count',
    data: {
      "data": 58,
      "status": {
        "code": 0,
        "msg": "request success"
      }
    }
  }, {
    url: '/api/auth/knowledge',
    data: {
      "data": [
        {
          _id: '58abe68865d86918d9c32044',
          title: '论装逼的可持续化发展',
          type: {
            '_id': '587889400329f31e23d9ef25',
            'name': '视频'
          },
          coverIcon: 'http://pic6.huitu.com/res/20130116/84481_20130116142820494200_1.jpg',
          author: '峰峰',
          content: '装逼一定要禁得住挨打，打不死就是可持续化发展，符合中国社会主义持续化发展思想！',
          status: 2,
          createBy: '587889400329f31e23d9ef24',
          __v: 0,
          comments: [
            {
              commentAt: '2017-02-21T06:51:09.036Z',
              commentBy: '587889400329f31e23d9ef24',
              commentName: '备注人 小花',
              commentType: 1,
              content: '装逼一定要禁得住挨打，打不死就是可持续化发展'
            }
          ],
          createAt: '2017-02-21T06:51:09.036Z',
          auditAt: '2017-02-21T06:51:09.036Z',
          auditBy: '587889400329f31e23d9ef24',
          auditName: 'admin',
          rejectAt: '2017-02-21T06:51:09.036Z',
          rejectBy: '587889400329f31e23d9ef24',
          tags: [
            {
              '_id': '58abe68865d86918d9c32044',
              'name': '标签'
            }
          ],
          category: {
            id: '587889400329f31e23d9ef24',
            name: '分类名',
            path: ',587889400329f31e23d9ef24,587889400329f31e23d9ef24,'
          }
        }
      ],
      "status": {
        "code": 0,
        "msg": "request success"
      }
    }
  }, {
    url: '/api/auth/expert_user/587889400329f31e23d9ef29',
    data: {
      "data": {
        "success": true
      },
      "status": {
        "code": 0,
        "msg": "request success"
      }
    }
  }, {
    url: '/api/auth/expert_permission/589d5cd1a7fca426846e2fef',
    data: {
      "status": {
        "code": 0,
        "msg": "request success"
      },
      "data": [
        {
          "_id": "589d5ba12cfc2127e709f427",
          "name": "权限管理",
          "__v": 0,
          "permissions": [
            {
              "name": "查看权限",
              "code": "school_permission_read",
              "_id": "589d5ba12cfc2127e709f428",
              "own": true
            }
          ]
        }, {
          "_id": "589d5ba12cfc2127e709f429",
          "name": "角色管理",
          "__v": 0,
          "permissions": [
            {
              "name": "查看角色",
              "code": "expert_role_read",
              "_id": "589d5ba12cfc2127e709f42a",
              "own": false
            }, {
              "name": "新增角色",
              "code": "expert_role_create",
              "_id": "589d5ba12cfc2127e709f42b",
              "own": true
            }, {
              "name": "编辑角色",
              "code": "expert_role_update",
              "_id": "589d5ba12cfc2127e709f42c",
              "own": false
            }
          ]
        }, {
          "_id": "589d5ba12cfc2127e709f42d",
          "name": "用户管理",
          "__v": 0,
          "permissions": [
            {
              "name": "查看用户",
              "code": "expert_user_read",
              "_id": "589d5ba12cfc2127e709f42e",
              "own": false
            }, {
              "name": "新增用户",
              "code": "expert_user_create",
              "_id": "589d5ba12cfc2127e709f42f",
              "own": false
            }, {
              "name": "编辑用户",
              "code": "expert_user_update",
              "_id": "589d5ba12cfc2127e709f430",
              "own": false
            }, {
              "name": "重置密码",
              "code": "expert_user_reset_password",
              "_id": "589d5ba12cfc2127e709f431",
              "own": false
            }
          ]
        }
      ]
    }
  }, {
    url: '/api/auth/expert_permission',
    data: {
      "status": {
        "code": 0,
        "msg": "request success"
      },
      "data": [
        {
          "_id": "589d5ba12cfc2127e709f427",
          "name": "权限管理",
          "__v": 0,
          "permissions": [
            {
              "name": "查看权限",
              "code": "school_permission_read",
              "_id": "589d5ba12cfc2127e709f428"
            }
          ]
        }, {
          "_id": "589d5ba12cfc2127e709f429",
          "name": "角色管理",
          "__v": 0,
          "permissions": [
            {
              "name": "查看角色",
              "code": "expert_role_read",
              "_id": "589d5ba12cfc2127e709f42a"
            }, {
              "name": "新增角色",
              "code": "expert_role_create",
              "_id": "589d5ba12cfc2127e709f42b"
            }, {
              "name": "编辑角色",
              "code": "expert_role_update",
              "_id": "589d5ba12cfc2127e709f42c"
            }
          ]
        }, {
          "_id": "589d5ba12cfc2127e709f42d",
          "name": "用户管理",
          "__v": 0,
          "permissions": [
            {
              "name": "查看用户",
              "code": "expert_user_read",
              "_id": "589d5ba12cfc2127e709f42e"
            }, {
              "name": "新增用户",
              "code": "expert_user_create",
              "_id": "589d5ba12cfc2127e709f42f"
            }, {
              "name": "编辑用户",
              "code": "expert_user_update",
              "_id": "589d5ba12cfc2127e709f430"
            }, {
              "name": "重置密码",
              "code": "expert_user_reset_password",
              "_id": "589d5ba12cfc2127e709f431"
            }
          ]
        }
      ]
    }
  }, {
    url: 'api/auth/expert_role/589d5cd1a7fca426846e2fef',
    data: {
      "data": {
        "success": true
      },
      "status": {
        "code": 0,
        "msg": "request success"
      }
    }
  }, {
    url: '/api/auth/knowlege_category',
    data: {
      "data": [
        {
          _id: "1234551",
          name: "一级分类1",
          knowledgeType: "",
          children: [
            {
              _id: "243543",
              name: "二级分类1",
              knowledgeType: "",
              children: [
                {
                  _id: "57686",
                  name: "三级分类1",
                  knowledgeType: "",
                  children: [
                    {
                      _id: "576861323",
                      name: "四级分类112",
                      knowledgeType: ""
                    }
                  ]
                }
              ]
            }, {
              _id: "2435431",
              name: "二级分类11",
              knowledgeType: "",
              children: [
                {
                  _id: "576861",
                  name: "三级分类11",
                  knowledgeType: "",
                  children: [
                    {
                      _id: "57686133",
                      name: "四级分类11",
                      knowledgeType: ""
                    }
                  ]
                }
              ]
            }
          ]
        }, {
          _id: "354223",
          name: "一级分类2",
          knowledgeType: "",
          children: [
            {
              _id: "254423",
              name: "二级分类2",
              knowledgeType: "",
              children: [
                {
                  _id: "1433212",
                  name: "三级分类2",
                  knowledgeType: "",
                  children: [
                    {
                      _id: "576826133",
                      name: "四级分类33",
                      knowledgeType: ""
                    }
                  ]
                }, {
                  _id: "14332121",
                  name: "三级分类21",
                  knowledgeType: "",
                  children: [
                    {
                      _id: "5768346133",
                      name: "四级分类32",
                      knowledgeType: ""
                    }
                  ]
                }
              ]
            }
          ]
        }, {
          _id: "134351",
          name: "一级分类3",
          knowledgeType: "",
          children: [
            {
              _id: "3154313",
              name: "二级分类3",
              knowledgeType: "",
              children: [
                {
                  _id: "134341",
                  name: "三级分类3",
                  knowledgeType: "",
                  children: [
                    {
                      _id: "5768613433",
                      name: "四级分类43",
                      knowledgeType: ""
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      "status": {
        "code": 0,
        "msg": "request success"
      }
    }
  }, {
    url: '/api/auth/expert_role',
    data: {
      "data": [
        {
          "_id": "589d5cd1a7fca426846e2fef",
          "name": "hello",
          "createBy": "5886b54bf029dd5b8de3f332",
          "__v": 0,
          "createdAt": "2017-02-10T06:25:21.832Z",
          "permissions": [
            {
              "name": "查看权限",
              "code": "expert_permission_read",
              "_id": "589d5ba12cfc2127e709f428"
            }, {
              "name": "新增角色",
              "code": "expert_role_create",
              "_id": "589d5ba12cfc2127e709f42b"
            }
          ]
        }, {
          "_id": "589d5d15a7fca426846e2ff1",
          "name": "hello2",
          "createBy": "5886b54bf029dd5b8de3f332",
          "__v": 0,
          "createdAt": "2017-02-10T06:26:29.252Z",
          "permissions": [
            {
              "name": "查看权限",
              "code": "expert_permission_read",
              "_id": "589d5ba12cfc2127e709f428"
            }, {
              "name": "新增角色",
              "code": "expert_role_create",
              "_id": "589d5ba12cfc2127e709f42b"
            }
          ]
        }, {
          "_id": "589d621cd49b3428db240eec",
          "name": "hello3",
          "createBy": "5886b54bf029dd5b8de3f332",
          "__v": 0,
          "createdAt": "2017-02-10T06:47:56.418Z",
          "permissions": [
            {
              "_id": "589d5ba12cfc2127e709f428",
              "code": "expert_permission_read",
              "name": "查看权限"
            }, {
              "_id": "589d5ba12cfc2127e709f42b",
              "code": "expert_role_create",
              "name": "新增角色"
            }
          ]
        }, {
          "_id": "58a118a1d832c34a35682a9b",
          "name": "helloxxxxxxxx",
          "createBy": "5886b54bf029dd5b8de3f332",
          "__v": 0,
          "createdAt": "2017-02-13T02:23:29.057Z",
          "permissions": [
            {
              "_id": "589d5ba12cfc2127e709f428",
              "code": "expert_permission_read",
              "name": "查看权限"
            }
          ]
        }
      ],
      "status": {
        "code": 0,
        "msg": "request success"
      }
    }
  }, {
    url: '/api/auth/knowledge/58abe68865d86918d9c32044',
    data: {
      "data": { _id: '58abe68865d86918d9c32044',
           title: '论装逼的可持续化发展',
           type: {
             '_id': '58abe68865d86918d9c32044',
             'name': '类型'
           },
           audit: true, // 此账户是否有审核权限标示
           coverIcon: 'https://baidu.com',
           author: '峰峰',
           content: '装逼一定要禁得住挨打，打不死就是可持续化发展，符合中国社会主义持续化发展思想！',
           status: 0,
           createBy: '587889400329f31e23d9ef24',
           createName: '创建人 小花',
           __v: 0,
           comments: [{
             commentAt: '2017-02-21T06:51:09.036Z',
             commentBy: '587889400329f31e23d9ef24',
             commentType: 1,
             content: '内容',
           }],
           createAt: '2017-02-21T06:51:09.036Z',
           auditAt: '2017-02-21T06:51:09.036Z',
           auditBy: '587889400329f31e23d9ef24',
           auditName: 'admin',
           rejectAt: '2017-02-21T06:51:09.036Z',
           rejectBy: '587889400329f31e23d9ef24',
           tags: [{
             '_id': '58abe68865d86918d9c32044',
             'name': '标签'
           }],
           category: {
             _id: '587889400329f31e23d9ef24',
             name: '分类名',
             path: ',587889400329f31e23d9ef24,587889400329f31e23d9ef24,' // 父类路径
           }
      },
      "status": {
        "code": 0,
        "msg": "request success"
      }
    }
  }, {
    url: '/api/auth/constitution',
    data: {
      "data": [{
        "_id": "587889400329f31e23d9ef24",
        "title": "广东省骨密度评定报告", // 报告标题
        "count": "1/1", // 评测次数
        "time": "2017-02-21", // 评测时间
        "type": 1, // 报告类型：1-骨密度，2-心肺功能，3-脊柱功能，4-体成份，5-血管机能
        "student": "587889400329f31e23d9ef24", // 学生id
        "school": "587889400329f31e23d9ef24", // 学校id
        "data": {
          "part": "脊柱", // 测试部位
          "TValue": -0.4, // T值
          "ZValue": -0.4, // Z值
          "intensityExponent": 100, // 骨强度指数
          "situation": 1, // 骨质情况：1-骨质正常，2-骨质少孔，3-骨质酥松
          "percentageYoungAdult": 94, // %年轻成人
          "percentagePeer": 93, // %同龄人
          "fractureRiskMultiple": 1.3, // 骨折风险倍数
        }
      },
        {
          "_id": "587889400329f31e23d9ef25",
          "title": "广东省骨密度评定报告", // 报告标题
          "count": "1/1", // 评测次数
          "time": "2017-02-21", // 评测时间
          "type": 2, // 报告类型：1-骨密度，2-心肺功能，3-脊柱功能，4-体成份，5-血管机能
          "student": "587889400329f31e23d9ef24", // 学生id
          "school": "587889400329f31e23d9ef24", // 学校id
          "data": {
            "part": "脊柱", // 测试部位
            "TValue": -0.4, // T值
            "ZValue": -0.4, // Z值
            "intensityExponent": 100, // 骨强度指数
            "situation": 1, // 骨质情况：1-骨质正常，2-骨质少孔，3-骨质酥松
            "percentageYoungAdult": 94, // %年轻成人
            "percentagePeer": 93, // %同龄人
            "fractureRiskMultiple": 1.3, // 骨折风险倍数
          }
        },
        {
          "_id": "587889400329f31e23d9ef26",
          "title": "广东省骨密度评定报告", // 报告标题
          "count": "1/1", // 评测次数
          "time": "2017-02-21", // 评测时间
          "type": 5, // 报告类型：1-骨密度，2-心肺功能，3-脊柱功能，4-体成份，5-血管机能
          "student": "587889400329f31e23d9ef24", // 学生id
          "school": "587889400329f31e23d9ef24", // 学校id
          "data": {
            "part": "脊柱", // 测试部位
            "TValue": -0.4, // T值
            "ZValue": -0.4, // Z值
            "intensityExponent": 100, // 骨强度指数
            "situation": 1, // 骨质情况：1-骨质正常，2-骨质少孔，3-骨质酥松
            "percentageYoungAdult": 94, // %年轻成人
            "percentagePeer": 93, // %同龄人
            "fractureRiskMultiple": 1.3, // 骨折风险倍数
          }
        }, {
          "_id": "587889400329f31e23d9ef24",
          "title": "广东省骨密度评定报告", // 报告标题
          "count": "1/1", // 评测次数
          "time": "2017-02-21", // 评测时间
          "type": 1, // 报告类型：1-骨密度，2-心肺功能，3-脊柱功能，4-体成份，5-血管机能
          "student": "587889400329f31e23d9ef24", // 学生id
          "school": "587889400329f31e23d9ef24", // 学校id
          "data": {
            "part": "脊柱", // 测试部位
            "TValue": -0.4, // T值
            "ZValue": -0.4, // Z值
            "intensityExponent": 100, // 骨强度指数
            "situation": 1, // 骨质情况：1-骨质正常，2-骨质少孔，3-骨质酥松
            "percentageYoungAdult": 94, // %年轻成人
            "percentagePeer": 93, // %同龄人
            "fractureRiskMultiple": 1.3, // 骨折风险倍数
          }
        },
          {
            "_id": "587889400329f31e23d9ef25",
            "title": "广东省骨密度评定报告", // 报告标题
            "count": "1/1", // 评测次数
            "time": "2017-02-21", // 评测时间
            "type": 2, // 报告类型：1-骨密度，2-心肺功能，3-脊柱功能，4-体成份，5-血管机能
            "student": "587889400329f31e23d9ef24", // 学生id
            "school": "587889400329f31e23d9ef24", // 学校id
            "data": {
              "part": "脊柱", // 测试部位
              "TValue": -0.4, // T值
              "ZValue": -0.4, // Z值
              "intensityExponent": 100, // 骨强度指数
              "situation": 1, // 骨质情况：1-骨质正常，2-骨质少孔，3-骨质酥松
              "percentageYoungAdult": 94, // %年轻成人
              "percentagePeer": 93, // %同龄人
              "fractureRiskMultiple": 1.3, // 骨折风险倍数
            }
          },
          {
            "_id": "587889400329f31e23d9ef26",
            "title": "广东省骨密度评定报告", // 报告标题
            "count": "1/1", // 评测次数
            "time": "2017-02-21", // 评测时间
            "type": 5, // 报告类型：1-骨密度，2-心肺功能，3-脊柱功能，4-体成份，5-血管机能
            "student": "587889400329f31e23d9ef24", // 学生id
            "school": "587889400329f31e23d9ef24", // 学校id
            "data": {
              "part": "脊柱", // 测试部位
              "TValue": -0.4, // T值
              "ZValue": -0.4, // Z值
              "intensityExponent": 100, // 骨强度指数
              "situation": 1, // 骨质情况：1-骨质正常，2-骨质少孔，3-骨质酥松
              "percentageYoungAdult": 94, // %年轻成人
              "percentagePeer": 93, // %同龄人
              "fractureRiskMultiple": 1.3, // 骨折风险倍数
            }
          }, {
            "_id": "587889400329f31e23d9ef24",
            "title": "广东省骨密度评定报告", // 报告标题
            "count": "1/1", // 评测次数
            "time": "2017-02-21", // 评测时间
            "type": 1, // 报告类型：1-骨密度，2-心肺功能，3-脊柱功能，4-体成份，5-血管机能
            "student": "587889400329f31e23d9ef24", // 学生id
            "school": "587889400329f31e23d9ef24", // 学校id
            "data": {
              "part": "脊柱", // 测试部位
              "TValue": -0.4, // T值
              "ZValue": -0.4, // Z值
              "intensityExponent": 100, // 骨强度指数
              "situation": 1, // 骨质情况：1-骨质正常，2-骨质少孔，3-骨质酥松
              "percentageYoungAdult": 94, // %年轻成人
              "percentagePeer": 93, // %同龄人
              "fractureRiskMultiple": 1.3, // 骨折风险倍数
            }
          },
            {
              "_id": "587889400329f31e23d9ef25",
              "title": "广东省骨密度评定报告", // 报告标题
              "count": "1/1", // 评测次数
              "time": "2017-02-21", // 评测时间
              "type": 2, // 报告类型：1-骨密度，2-心肺功能，3-脊柱功能，4-体成份，5-血管机能
              "student": "587889400329f31e23d9ef24", // 学生id
              "school": "587889400329f31e23d9ef24", // 学校id
              "data": {
                "part": "脊柱", // 测试部位
                "TValue": -0.4, // T值
                "ZValue": -0.4, // Z值
                "intensityExponent": 100, // 骨强度指数
                "situation": 1, // 骨质情况：1-骨质正常，2-骨质少孔，3-骨质酥松
                "percentageYoungAdult": 94, // %年轻成人
                "percentagePeer": 93, // %同龄人
                "fractureRiskMultiple": 1.3, // 骨折风险倍数
              }
            },
            {
              "_id": "587889400329f31e23d9ef26",
              "title": "广东省骨密度评定报告", // 报告标题
              "count": "1/1", // 评测次数
              "time": "2017-02-21", // 评测时间
              "type": 5, // 报告类型：1-骨密度，2-心肺功能，3-脊柱功能，4-体成份，5-血管机能
              "student": "587889400329f31e23d9ef24", // 学生id
              "school": "587889400329f31e23d9ef24", // 学校id
              "data": {
                "part": "脊柱", // 测试部位
                "TValue": -0.4, // T值
                "ZValue": -0.4, // Z值
                "intensityExponent": 100, // 骨强度指数
                "situation": 1, // 骨质情况：1-骨质正常，2-骨质少孔，3-骨质酥松
                "percentageYoungAdult": 94, // %年轻成人
                "percentagePeer": 93, // %同龄人
                "fractureRiskMultiple": 1.3, // 骨折风险倍数
              }
            }, {
              "_id": "587889400329f31e23d9ef24",
              "title": "广东省骨密度评定报告", // 报告标题
              "count": "1/1", // 评测次数
              "time": "2017-02-21", // 评测时间
              "type": 1, // 报告类型：1-骨密度，2-心肺功能，3-脊柱功能，4-体成份，5-血管机能
              "student": "587889400329f31e23d9ef24", // 学生id
              "school": "587889400329f31e23d9ef24", // 学校id
              "data": {
                "part": "脊柱", // 测试部位
                "TValue": -0.4, // T值
                "ZValue": -0.4, // Z值
                "intensityExponent": 100, // 骨强度指数
                "situation": 1, // 骨质情况：1-骨质正常，2-骨质少孔，3-骨质酥松
                "percentageYoungAdult": 94, // %年轻成人
                "percentagePeer": 93, // %同龄人
                "fractureRiskMultiple": 1.3, // 骨折风险倍数
              }
            },
              {
                "_id": "587889400329f31e23d9ef25",
                "title": "广东省骨密度评定报告", // 报告标题
                "count": "1/1", // 评测次数
                "time": "2017-02-21", // 评测时间
                "type": 2, // 报告类型：1-骨密度，2-心肺功能，3-脊柱功能，4-体成份，5-血管机能
                "student": "587889400329f31e23d9ef24", // 学生id
                "school": "587889400329f31e23d9ef24", // 学校id
                "data": {
                  "part": "脊柱", // 测试部位
                  "TValue": -0.4, // T值
                  "ZValue": -0.4, // Z值
                  "intensityExponent": 100, // 骨强度指数
                  "situation": 1, // 骨质情况：1-骨质正常，2-骨质少孔，3-骨质酥松
                  "percentageYoungAdult": 94, // %年轻成人
                  "percentagePeer": 93, // %同龄人
                  "fractureRiskMultiple": 1.3, // 骨折风险倍数
                }
              },
              {
                "_id": "587889400329f31e23d9ef26",
                "title": "广东省骨密度评定报告", // 报告标题
                "count": "1/1", // 评测次数
                "time": "2017-02-21", // 评测时间
                "type": 5, // 报告类型：1-骨密度，2-心肺功能，3-脊柱功能，4-体成份，5-血管机能
                "student": "587889400329f31e23d9ef24", // 学生id
                "school": "587889400329f31e23d9ef24", // 学校id
                "data": {
                  "part": "脊柱", // 测试部位
                  "TValue": -0.4, // T值
                  "ZValue": -0.4, // Z值
                  "intensityExponent": 100, // 骨强度指数
                  "situation": 1, // 骨质情况：1-骨质正常，2-骨质少孔，3-骨质酥松
                  "percentageYoungAdult": 94, // %年轻成人
                  "percentagePeer": 93, // %同龄人
                  "fractureRiskMultiple": 1.3, // 骨折风险倍数
                }
              }],
      "status": {
        "code": 0,
        "msg": "request success"
      }
    },
  }, 
  {
    url: '/api/auth/student',
    data: [
      {
        "_id": '58abe68865d86918d9c32044',
        "name": "test123",
        "sex": 2,
        "age": 23,
        "identification": "445************123",
        "num": "11422****8",
        "activeClass": "58abe68865d86sdc8d9c32044", // 所在班级id
      }, {
        "_id": '58abe68865d86918d9c32045',
        "name": "test123",
        "sex": 2,
        "age": 23,
        "identification": "445************123",
        "num": "11422****8",
        "activeClass": "58abe68865d86sdc8d9c32044", // 所在班级id
      }, {
        "_id": '58abe68865d86918d9c32046',
        "name": "test123",
        "sex": 2,
        "age": 23,
        "identification": "445************123",
        "num": "11422****8",
        "activeClass": "58abe68865d86sdc8d9c32044", // 所在班级id
      }],
    "status": {
      "code": 0,
      "msg": "request success"
    }
  }, {
    url: '/api/auth/constitution/count',
    "data": 12,
    "status": {
      "code": 0,
      "msg": "request success"
    }
  }
];
export default function(req, res) {
  const nowRequest = data.find(item => req._parsedUrl.pathname.endsWith(item.url));
  if (nowRequest) {
    res.json(nowRequest.data);
    return true;
  } else {
    // if (req._parsedUrl.pathname.endsWith('/user')) {
    //   res.json({
    //     status: {
    //       code: 1,
    //       msg: "request success"
    //     }
    //   });
    //   return true;
    // }
    return false;
  }
}
