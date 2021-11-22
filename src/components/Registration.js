import React from 'react'
import { Col, Container, Row, Form, Button, Modal } from 'react-bootstrap'
import "./styles/Registration.css";
import { useState } from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default function Registration() {
    const [showRenderDetailsForm, setShowRenderDetailsForm] = useState(false);
    const [teamDetails, setTeamDetails] = useState({
        teamName: '',
        domain: '',
        teamSize: '',
    });
    const [abstract, setAbstract] = useState();
    const [loading, setLoading] = useState(false);

    const submitAllDetails = () => {
        let details = new FormData();
        for (let key in teamDetails)
            details.append(key, teamDetails[key]);
        details.append('abstract', abstract);
        const requestOptions = {
            method: 'POST',
            body: details
        };
        setLoading(true);
        fetch('https://floating-stream-51231.herokuapp.com/register', requestOptions)
            .then(response => {
                if (response.status === 200) {
                    setLoading(false);
                    alert("Registration Successful");
                }
                else {
                    setLoading(false);
                    alert("Please try again");
                }
            })
            .catch(response => {
                console.log(response);
                alert("please try again")
            });
        setTeamDetails({
            teamName: '',
            domain: '',
            teamSize: ''
        });
        setShowRenderDetailsForm(false);
    }

    const handleFile = (e) => {
        setAbstract(e.target.files[0]);
    }

    const renderDetailsForm = () => {
        let size = [];
        for (var i = 0; i < teamDetails.teamSize - 1; i++) {
            size.push(i);
        }
        return <Modal size="lg" onHide={() => setShowRenderDetailsForm(false)} show={showRenderDetailsForm}>
            <Modal.Header className="mod-head">
                <Modal.Title style={{ "font-weight": "700" }}>Team Details</Modal.Title>
            </Modal.Header>
            <Modal.Body className="mod-body">
                <p className="mod-p">Team Name : {teamDetails.teamName}</p>
                <p className="mod-p">Domain : {teamDetails.domain}</p>
                <p className="mod-p">Team Size :  {teamDetails.teamSize}</p>
                <p className="mod-f">Team leader Details</p>
                <Form >
                    <Row>
                        <Col xs={8}>
                            <Form.Group className="mb-3">
                                <Form.Control required type="text" placeholder="Name" onChange={(e) => setTeamDetails({ ...teamDetails, teamLeaderName: e.target.value })} />
                            </Form.Group>
                        </Col>
                        <Col xs={8}>
                            <Form.Group className="mb-3">
                                <Form.Control required type="email" placeholder="Email" onChange={(e) => setTeamDetails({ ...teamDetails, teamLeaderEmail: e.target.value })} />
                            </Form.Group>
                        </Col>
                        <Col xs={8}>
                            <Form.Group className="mb-3">
                                <Form.Control required type="text" placeholder="Mobile No" onChange={(e) => setTeamDetails({ ...teamDetails, teamLeaderPhone: e.target.value })} />
                            </Form.Group>
                        </Col>
                        <Col xs={8}>
                            <Form.Group className="mb-3">
                                <Form.Control required type="text" placeholder="College" onChange={(e) => setTeamDetails({ ...teamDetails, teamLeaderCollege: e.target.value })} />
                            </Form.Group>
                        </Col>
                    </Row>
                    {

                        size.map(i =>
                            <Row key={i + 1}>
                                <p className="mod-f">Member {i + 1} Details</p>
                                <Col xs={8}>
                                    <Form.Group className="mb-3">
                                        <Form.Control name={"member" + (i + 1) + "Name"} required type="text" placeholder="Name" onChange={(e) => setTeamDetails({ ...teamDetails, [e.target.name]: e.target.value })} />
                                    </Form.Group>
                                </Col>
                                <Col xs={8} >
                                    <Form.Group className="mb-3">
                                        <Form.Control name={"member" + (i + 1) + "Email"} required type="email" placeholder="Email" onChange={(e) => setTeamDetails({ ...teamDetails, [e.target.name]: e.target.value })} />
                                    </Form.Group>
                                </Col>
                                <Col xs={8}>
                                    <Form.Group className="mb-3">
                                        <Form.Control name={"member" + (i + 1) + "Phone"} required type="text" placeholder="Mobile No" onChange={(e) => setTeamDetails({ ...teamDetails, [e.target.name]: e.target.value })} />
                                    </Form.Group>
                                </Col>
                                <Col xs={8}>
                                    <Form.Group className="mb-3">
                                        <Form.Control name={"member" + (i + 1) + "College"} required type="text" placeholder="College" onChange={(e) => setTeamDetails({ ...teamDetails, [e.target.name]: e.target.value })} />
                                    </Form.Group>
                                </Col>
                            </Row>
                        )
                    }
                    <br></br>
                    <Row>
                        <Col xs={8}>
                            <p className="mod-f">Upload Abstract (only pdf)</p>
                            <Form.Group className="mb-3">
                                <Form.Control required type="file" onChange={handleFile} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer className="mod-head">
                <Button className="bttn" onClick={() => setShowRenderDetailsForm(false)} >Close</Button>
                <Button className="bttn" onClick={submitAllDetails}>Submit</Button>
            </Modal.Footer>
        </Modal>
    }

    const renderPopUp = (e) => {
        e.preventDefault();
        setShowRenderDetailsForm(true);
    }
    return (
        <>
            {
                loading ? <Loader
                    type="Puff"
                    color="#00BFFF"
                    height={100}
                    width={100}
                /> : null
            }
            <Container>
                <Row>
                    <a href="https://ieee-sit-sb-wie-code-2021.netlify.app/" className="home" style={{ "margin-top": "4vh" }}><button><span ><i class="fas fa-chevron-left"></i></span> Home</button></a>
                </Row>
                <Row>
                    <div className="heading">WIE CODE</div>
                </Row>
                <Row>
                    <h3 className="para" >WIE CODE is a national level 12 -hour hackathon would conduct by <br /> WIE affinity group, IEEE, Siddaganga Institute of Technology Student Branch, Tumkur.
                    </h3>
                </Row>
            </Container>
            <Container style={{ marginTop: "4rem", display:"flex", flexDirection:"column", justifyContent:"center" }}>
                <h1 className="reg">Register Here</h1>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Control value={teamDetails.teamName} required type="text" placeholder="Team Name" onChange={(e) => setTeamDetails({ ...teamDetails, teamName: e.target.value })} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Control value={teamDetails.domain} required type="text" placeholder="Domain" onChange={(e) => setTeamDetails({ ...teamDetails, domain: e.target.value })} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Control value={teamDetails.teamSize} required type="number" placeholder="Team Size (2-4)" min="2" max="4" onChange={(e) => setTeamDetails({ ...teamDetails, teamSize: e.target.value })} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Col>
                        {
                            teamDetails.teamName && teamDetails.domain && teamDetails.teamSize <= 4 && teamDetails.teamSize >= 2 ?
                                <button className="bttn" type="submit" onClick={renderPopUp}>Submit</button> :
                                <button className="bttn" type="submit" disabled>Submit</button>
                        }
                    </Col>
                </Form>
            </Container>
            <footer>

                <div class="social">
                    <ul class="social_icon">
                        <li><a href="#"><ion-icon name="logo-facebook"></ion-icon></a></li>
                        <li><a href="#"><ion-icon name="logo-twitter"></ion-icon></a></li>
                        <li><a href="#"><ion-icon name="logo-linkedin"></ion-icon></a></li>
                        <li><a href="#"><ion-icon name="logo-instagram"></ion-icon></a></li>
                    </ul>
                </div><br></br>
                <div class="menu1">
                    <ul class="menu">
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Contact</a></li>

                    </ul>
                </div><br></br>
                <div class="p1">©2021 IEEE SIT SB | All Rights Reserved </div>
            </footer>

            {renderDetailsForm()}
        </>
    )
}