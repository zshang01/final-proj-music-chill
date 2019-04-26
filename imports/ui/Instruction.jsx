import React from "react";

export default class Instruction extends React.Component {
  render() {
    return (
      <div>
        <div className="instruction">
          <div className="container">
            <div className="row">
              <div className="subtitle content-center col-lg-12 col-md-12 text-center">
                <h1>How to use it</h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3">
                <div className="info">
                  <div className="">
                    <i class="fa fa-spotify" style={{ fontSize: "58px", color: "#2BB34F" }}></i>
                    <div className="description">
                      <h2 className="info-title">Login with Spotify</h2>
                      <p className="desc">
                        Login with your spotify account or Sign up with our Web
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-3">
                <div className="info">
                  <div className="">
                    <i className="fa fa-spotify" style={{ fontSize: "58px", color: "#2BB34F" }}></i>
                    <div className="description">
                      <h2 className="info-title">Discussion Board</h2>
                      <p className="desc">
                        You will see the hottest and latest Discussion of songs 
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info">
                  <div className="icon icon-success">
                    <i class="fa fa-align-justify" style={{ fontSize: "58px", color: "#2BB34F" }}></i>
                    <div className="description">
                      <h2 className="info-title">Search Bar (with Spotify login)</h2>
                      <p className="desc">
                        You can search for songs and make comment of it.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info">
                  <div className="icon icon-success">
                    <i className="fa fa-music" style={{ fontSize: "58px", color: "#2BB34F" }}></i>
                    <div className="description">
                      <h2 className="info-title">Get recomment(with Spotify login)</h2>
                      <p className="desc">
                        We will recomend songs for you and you can participate and make comment of song
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="info">
                  <div className="icon icon-success">
                    <i class="fa fa-microphone" style={{ fontSize: "58px", color: "#2BB34F" }}></i>
                    <div className="description">
                      <h2 className="info-title">Recent Activity (with Spotify login)</h2>
                      <p className="desc">
                        You could browse recent Five Activity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
