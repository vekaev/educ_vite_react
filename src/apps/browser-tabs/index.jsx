import React, { useState } from "react";
import { NavLink, Route, Switch } from "react-router-dom";

import "./index.css";

export function BrowserTabs({ match }) {
  return (
    <div className="browser-tabs">
      <div className="browser">
        <div className="tabs">
          <Tab title="Home" url={match.url} />
          <Tab title="About" url={match.url + "/about"} />
          <Tab title="Features" url={match.url + "/features"} />
        </div>
        <div className="viewport">
          <Switch>
            <Route exact path={match.url}>
              Home
            </Route>
            <Route path={match.url + "/about"}>About</Route>
            <Route path={match.url + "/features"}>Features</Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

const Tab = ({ title, url }) => {
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, opacity: 0 });

  const moveHighlight = (e) =>
    setHighlightStyle({ left: e.nativeEvent.layerX - 150 });

  const hideHighlight = (e) =>
    setHighlightStyle({ opacity: 0, left: e.nativeEvent.layerX - 150 });

  return (
    <div className="tab" onMouseOut={hideHighlight} onMouseMove={moveHighlight}>
      <div className="highlight" style={highlightStyle} />
      <NavLink to={url} activeClassName="is-active" exact>
        {title}
      </NavLink>
    </div>
  );
};
