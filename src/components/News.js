import * as React from "react";
import {
  Col,
  Grid,
  Thumbnail,
  Row,
  Image,
} from "react-bootstrap";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import withAuthorization from "./withAuthorization";

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      loading: true
    };
  }

  componentDidMount() {

    axios
      .get("https://newsapi.org/v2/everything?q=africa+hunger+disease&pageSize=5&sortBy=publishedAt&apiKey=aa6c44bcbe44451b94d83e41c3c3db97")
      .then(data => {
        this.setState({ loading: false });
        var obj = data.data.articles;
    
        console.log(obj);
        this.setState({ news: obj });
      })
      .catch((err) => { })
  }

  render() {
    return (
      <Grid>
        <ClipLoader
      
          sizeUnit={"px"}
          size={200}
          color={"#123abc"}
          loading={this.state.loading}
        />
         {this.state.news.length==0 && !this.state.loading? 
         <h2>No News </h2> : <div>
        {this.state.news.map((item, i) => (
          <Thumbnail key={i}>
            <Grid>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <h4>{item.title}</h4>
                </Col>
                <span className="input-label">
                <Col xs={12} sm={5} md={5} lg={5}>
                  <p>
                      <Image width="250" src={item.urlToImage} />
                  </p> </Col> 
                  <Col xs={12} sm={5} md={5} lg={5}>
                  <p>{item.description}</p>
                  <a href={item.url}><p>more</p></a>
                </Col>
                </span>
              </Row>
            </Grid>
          </Thumbnail>
        ))}
        </div>
        }
      </Grid>
    );
  }
}

const authCondition = authUser => !!authUser;
export default withAuthorization(authCondition)(News);
