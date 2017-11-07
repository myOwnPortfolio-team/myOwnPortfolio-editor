import React from 'react';
// import axios from 'axios';

class Editor extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     url: 'https://api.github.com/repos/myOwnPortfolio-team/myOwnPortfolio-core/contents/app/modules/about/json_schema',
  //     module: [],
  //   };
  // }
  //
  // componentDidMount() {
  //   axios.get(this.state.url)
  //     .then((res) => {
  //       axios.get(res.data.download_url)
  //         .then((resu) => {
  //           this.setState({ module: resu });
  //           console.log(resu);
  //         });
  //     });
  // }

  render() {
    return (
      <div className="editor" />
    );
  }
}

module.exports = Editor;
