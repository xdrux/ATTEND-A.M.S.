import React from "react";
import './css/common.css';
import './css/RegisterOptions.css'
import backIcon from './../assets/back.png'
import logo from './../assets/appLogo.png';
import { Navigate } from "react-router-dom";

class Classes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: false,
            back: false,
            classes: [1, 2, 3, 4, 5],
            selectedClass: null
        };
    }

    componentDidMount() {
        this.timeout = setTimeout(() => {
            this.setState({ isActive: true });
        }, 100);

        this.createClasses();
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    handleBackClick = () => {
        this.setState({ back: true });
    };

    handleClassClick = (clickedClass) => {
        console.log("Clicked class:", clickedClass);
        // Add your logic here for handling the clicked class
        // const selectedClass = { clickedClass };
        const isClicked = true;
        this.setState({ selectedClass: clickedClass, isClicked });
    };

    createClasses() {
        const { classes } = this.state;
        var classCounter = 0;
        var divElement = `<div class="classesBlock">`;
        var wrapper = `<div class= "classMainBlock">`;

        while (classCounter !== classes.length) {
            let currentClass = classes[classCounter];
            divElement += `<p id="${currentClass}" class="clickable">${currentClass}</p> `;

            if (classCounter + 1 === classes.length) {
                divElement += "</div>";
                wrapper += divElement;
                wrapper += "</div>";
            } else if ((classCounter + 1) % 3 === 0) {
                console.log("huhu")
                divElement += "</div>";
                wrapper += divElement;
                divElement = `<div class="classesBlock">`;
            }

            classCounter++;
        }

        console.log(wrapper);
        document.getElementById("classList").innerHTML = wrapper;

        // Add event listeners after setting innerHTML
        const clickableElements = document.getElementsByClassName("clickable");
        for (let i = 0; i < clickableElements.length; i++) {
            clickableElements[i].addEventListener("click", (event) => {
                this.handleClassClick(event.target.id);
            });
        }
    }

    render() {
        const { isClicked, selectedClass } = this.state;

        if (isClicked) {
            const url = `/Register/MyClasses/ClassRoster/${selectedClass}`;
            console.log(url);
            return <Navigate to={url} replace />;
        }
        return (
            <div className="Bg">
                <div className={`fade-in ${this.state.isActive ? 'active' : ''}`}>
                    <div className="Header">
                        {this.state.back ? (
                            <Navigate to="/Register" />
                        ) : (
                            <img onClick={this.handleBackClick} className="BackIcon" src={backIcon} alt="back" />
                        )}
                        <p className="HeaderText">My Classes</p>
                    </div>
                    <div id="classList"></div>
                    <img className="AppLogo" src={logo} alt="logo" />
                </div>
            </div>
        );
    }
}

export default Classes;
