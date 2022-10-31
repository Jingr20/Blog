import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";
import "../static/css/AddArticle.css";

import marked from "marked";
import axios from "axios";
import servicePath from "../config/apiUrl";
import xss from "xss";

function AddArticle() {
  // 获取路由参数
  const params = useParams();

  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [showDate, setShowDate] = useState(); //发布日期
  const [updateDate, setUpdateDate] = useState(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType, setSelectType] = useState(); //选择的文章类别

  marked.setOptions({
    renderer: marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  function getTypeInfo() {
    axios({
      method: "post",
      url: servicePath.getTypeInfo,
      headers: {
        sessionId: localStorage.getItem("openId"),
      },
      withCredentials: true,
    }).then((res) => {
      if (res.data.data == "没有登录") {
        localStorage.removeItem("openId");
        window.location.href = "/";
      } else {
        // console.log(res.data.data);
        setTypeInfo(res.data.data);
      }
    });
  }

  function getArticleById(id) {
    axios(servicePath.getArticleById + id, {
      headers: {
        sessionId: localStorage.getItem("openId"),
      },
    }).then((res) => {
      let article = res.data.data[0];
      //let articleInfo= res.data.data[0]
      setArticleTitle(article.title);
      setArticleContent(article.article_content);
      let html = marked(article.article_content);
      setMarkdownContent(html);
      setIntroducemd(article.introduce);
      let tmpInt = marked(article.introduce);
      setIntroducehtml(tmpInt);
      setShowDate(article.addTime);
      setSelectType(article.typeId);
    });
  }

  // 组件首次渲染请求数据
  useEffect(() => {
    getTypeInfo();
    if (params.id) {
      setArticleId(params.id);
      getArticleById(params.id);
    }
  }, []);

  function changeContent(e) {
    setArticleContent(e.target.value);
    setMarkdownContent(marked(articleContent));
  }

  function changeIntroduce(e) {
    setIntroducemd(e.target.value);
    setIntroducehtml(marked(introducemd));
  }

  function saveArticle() {
    if (!articleTitle) {
      message.error("文章标题不能为空");
      return;
    }
    if (!selectedType) {
      message.error("文章类型不能为空");
      return;
    }
    if (!articleContent) {
      message.error("文章内容不能为空");
      return;
    }
    if (!introducemd) {
      message.error("文章简介不能为空");
      return;
    }
    if (!showDate) {
      message.error("发布日期不能为空");
      return;
    }

    let dataProps = {};
    dataProps.type_id = selectedType;
    dataProps.title = xss(articleTitle, {
      whiteList: [], // 白名单为空，表示过滤所有标签
      stripIgnoreTag: true, // 过滤所有非白名单标签的HTML
      stripIgnoreTagBody: ["script"], // script标签较特殊，需要过滤标签中间的内容
    });
    dataProps.article_content = xss(articleContent, {
      whiteList: [], // 白名单为空，表示过滤所有标签
      stripIgnoreTag: true, // 过滤所有非白名单标签的HTML
      stripIgnoreTagBody: ["script"], // script标签较特殊，需要过滤标签中间的内容
    });
    dataProps.introduce = xss(introducemd, {
      whiteList: [], // 白名单为空，表示过滤所有标签
      stripIgnoreTag: true, // 过滤所有非白名单标签的HTML
      stripIgnoreTagBody: ["script"], // script标签较特殊，需要过滤标签中间的内容
    });
    let datetext = showDate.replace("-", "/"); //把字符串转换成时间戳
    dataProps.addTime = new Date(datetext).getTime() / 1000;

    if (articleId === 0) {
      // 新增文章
      dataProps.view_count = Math.ceil(Math.random() * 100) + 1000;
      // dataProps.view_count = 0;
      axios({
        method: "post",
        url: servicePath.addArticle,
        headers: {
          sessionId: localStorage.getItem("openId"),
        },
        data: dataProps,
      }).then((res) => {
        setArticleId(res.data.insertId);
        if (res.data.isSuccess) {
          message.success("文章添加成功");
        } else {
          message.error("文章添加失败");
        }
      });
    } else {
      // 修改文章
      dataProps.id = articleId;
      axios({
        method: "post",
        url: servicePath.updateArticle,
        headers: {
          sessionId: localStorage.getItem("openId"),
        },
        data: dataProps,
      }).then((res) => {
        if (res.data.isSuccess) {
          message.success("文章修改成功");
        } else {
          message.error("文章修改失败");
        }
      });
    }
  }

  return (
    <div>
      <Row gutter={5}>
        {/* 左边编辑 */}
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                placeholder="文章标题"
                size="large"
                value={articleTitle}
                onChange={(e) => {
                  setArticleTitle(e.target.value);
                }}
              />
            </Col>
            <Col span={4}>
              &nbsp;
              <Select
                placeholder="请选择类型"
                size="large"
                style={{ width: 120 }}
                value={selectedType}
                onChange={(value) => {
                  setSelectType(value);
                }}
              >
                {typeInfo.map((item) => {
                  return (
                    <Select.Option key={item.id} value={item.id}>
                      {item.typeName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <Input.TextArea
                className="markdown-content"
                rows={35}
                value={articleContent}
                onChange={changeContent}
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>
        {/* 右边管理 */}
        <Col span={6}>
          <Row>
            <Col span={24}>
              {/* <Button  size="large">暂存文章</Button>&nbsp; */}
              <Button type="primary" size="large" onClick={saveArticle}>
                发布文章
              </Button>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={24}>
              <Input.TextArea
                rows={4}
                placeholder="文章简介"
                value={introducemd}
                onChange={changeIntroduce}
              />
              <br />
              <br />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{ __html: introducehtml }}
              ></div>
            </Col>
          </Row>
          <br />
          <Row>
            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  placeholder="发布日期"
                  size="large"
                  // value={showDate}
                  onChange={(date, dateString) => {
                    setShowDate(dateString);
                  }}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default AddArticle;
