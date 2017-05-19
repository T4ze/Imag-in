import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: '',
      caption: '',
    };
    this.sendImage = this.sendImage.bind(this);
  }

  /* eslint-disable class-methods-use-this */
  sendImage() {
    const body = {
      picture: this.state.src,
      caption: this.state.caption,
    };

    fetch('http://localhost:4242/api/pictures', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(() => {
      this.setState({
        src: '',
        caption: '',
      });
    });
  }

  render() {
    return (
      <section className="section">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="box">
              <div className="field">
                <label className="label" htmlFor="picture">Picture link</label>
                <p className="control">
                  <input
                    className="input inputs"
                    name="picture"
                    type="text"
                    placeholder="Enter your link"
                    required="required"
                    onChange={e => this.setState({ src: e.target.value })}
                    value={this.state.src}
                  />
                </p>
              </div>
              <div className="field">
                <label className="label" htmlFor="caption">Caption</label>
                <p className="control">
                  <textarea
                    className="textarea inputs"
                    name="caption"
                    placeholder="Picture detail"
                    onChange={e => this.setState({ caption: e.target.value })}
                    value={this.state.caption}
                  />
                </p>
              </div>
              <div className="field is-grouped has-addons has-addons-right">
                <p className="control">
                  <button
                    className="button is-outlined is-primary"
                    key="button"
                    onClick={this.sendImage}
                  >
                    Submit
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Form;
