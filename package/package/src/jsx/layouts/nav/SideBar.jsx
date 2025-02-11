/// Menu
//import Metismenu from "metismenujs";
import React, { Fragment, useContext, useEffect, useReducer, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import Collapse from 'react-bootstrap/Collapse';
/// Link
import { Link } from "react-router-dom";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";
import { MenuList } from './Menu';


const reducer = (previousState, updatedState) => ({
  ...previousState,
  ...updatedState,
});

const initialState = {
  active: "",
  activeSubmenu: "",
}


const SideBar = () => {
  let year = new Date().getFullYear()
  const {
    iconHover,
    sidebarposition,
    headerposition,
    sidebarLayout,
  } = useContext(ThemeContext);

  const [state, setState] = useReducer(reducer, initialState);

  // For scroll
  const [hideOnScroll, setHideOnScroll] = useState(true)
  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > prevPos.y
      if (isShow !== hideOnScroll) setHideOnScroll(isShow)
    },
    [hideOnScroll]
  )

  const handleMenuActive = status => {
    setState({ active: status });
    if (state.active === status) {
      setState({ active: "" });
    }

  }
  const handleSubmenuActive = (status) => {
    setState({ activeSubmenu: status })
    if (state.activeSubmenu === status) {
      setState({ activeSubmenu: "" })

    }

  }

  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  useEffect(() => {
    MenuList.forEach((data) => {
      data.content?.forEach((item) => {
        if (path === item.to) {
          setState({ active: data.title })
        }
        item.content?.forEach(ele => {
          if (path === ele.to) {
            setState({ activeSubmenu: item.title, active: data.title })
          }
        })
      })
    })
  }, [path]);

  return (
    <div
      className={`dlabnav ${iconHover} ${sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
        ? hideOnScroll > 120
          ? "fixed"
          : ""
        : ""
        }`}
    >
      <PerfectScrollbar className="dlabnav-scroll">
        <ul className="metismenu" id="menu">
          {MenuList.map((data, index) => {
            let menuClass = data.classsChange;
            if (menuClass === "menu-title") {
              return (
                <li className={menuClass} key={index} >{data.title}</li>
              )
            } else {
              return (
                <li className={` ${state.active === data.title ? 'mm-active' : ''} ${data.to === path ? 'mm-active' : ''}`}
                  key={index}
                >

                  {data.content && data.content.length > 0 ?
                    <Link to={"#"}
                      className="has-arrow"
                      onClick={() => { handleMenuActive(data.title) }}
                    >
                      {data.iconStyle}
                      <span className="nav-text">{data.title}</span>
                    </Link>
                    :
                    <Link to={data.to} >
                      {data.iconStyle}
                      <span className="nav-text">{data.title}</span>
                    </Link>
                  }
                  <Collapse in={state.active === data.title ? true : false}>
                    <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                      {data.content && data.content.map((data, index) => {
                        return (
                          <li key={index}
                            className={`${state.activeSubmenu === data.title ? "mm-active" : ""} ${data.to === path ? 'mm-active' : ''}`}
                          >
                            {data.content && data.content.length > 0 ?
                              <>
                                <Link to={data.to} className={data.hasMenu ? 'has-arrow' : ''}
                                  onClick={() => { handleSubmenuActive(data.title) }}
                                >
                                  {data.title}
                                </Link>
                                <Collapse in={state.activeSubmenu === data.title ? true : false}>
                                  <ul className={`${menuClass === "mm-collapse" ? "mm-show" : ""}`}>
                                    {data.content && data.content.map((data, index) => {
                                      return (
                                        <Fragment key={index}>
                                          <li >
                                            <Link to={data.to} className={`${path === data.to ? "mm-active" : ""}`} >{data.title}</Link>
                                          </li>
                                        </Fragment>
                                      )
                                    })}
                                  </ul>
                                </Collapse>
                              </>
                              :
                              <Link to={data.hasMenu ? '#' : data.to} className={`${data.to === path ? 'mm-active' : ''}`}>
                                {data.title}
                              </Link>
                            }

                          </li>

                        )
                      })}
                    </ul>
                  </Collapse>
                </li>
              )
            }
          })}
        </ul>
        <div className="plus-box">
          <div className="text-center">
            <h4 className="fs-18 font-w600 mb-3">Enable Workload Automation System</h4>
            <Link to={"#"} className="btn btn-primary btn-rounded">Learn more <i className="fas fa-caret-right"></i></Link>
          </div>
        </div>
        <div className="copyright">
          <p><strong>Workload Project Management</strong> © {year} All Rights Reserved</p>
          <p className="fs-12">Made with <span className="heart"
            onClick={
              (e) => { e.target.classList.toggle("heart-blast") }
            }
          ></span> by DexignLab</p>
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
