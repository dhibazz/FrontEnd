import React, { useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { v4 as uuidv4 } from 'uuid';
import { connect } from "react-redux"
import swal from "sweetalert";

import {
  Card,
  CardBody,
  Col,
  Row,
  CardTitle,
  Container,
  Button,
  Alert
} from "reactstrap";

import {
  addNewOffer,
  deleteOffer,
  getOffers,
  updateOffer,
} from "../../store/actions"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const FormElements = (props) => {

  const { offers } = props

  const { match: { params: { id } } } = props
  const typeForm = window.location.pathname.split('/')[2];

  //initialisation lel objet offre w state feha objet taaml onchange aala kol input 
  const initialState = {
    poste: "",
    description: "",
    emplacement: "",
    experience: "",
    type: "",
    niveau: "",
    typeemploi: ""
  };

  const [customchk, setcustomchk] = useState(true);
  const [customchkPrimary, setcustomchkPrimary] = useState(true);
  const [customchkSuccess, setcustomchkSuccess] = useState(true);
  const [customchkInfo, setcustomchkInfo] = useState(true);
  const [customchkWarning, setcustomchkWarning] = useState(true);
  const [customchkDanger, setcustomchkDanger] = useState(true);
  const [customOutlinePrimary, setcustomOutlinePrimary] = useState(true);
  const [customOutlineSuccess, setcustomOutlineSuccess] = useState(true);
  const [customOutlineInfo, setcustomOutlineInfo] = useState(true);
  const [customOutlineWarning, setcustomOutlineWarning] = useState(true);
  const [customOutlineDanger, setcustomOutlineDanger] = useState(true);
  const [toggleSwitch, settoggleSwitch] = useState(true);
  const [toggleSwitchSize, settoggleSwitchSize] = useState(true);
  const [offre, setOffre] = useState(initialState);
  const [offreToEdit, setOffreToEdit] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const { onGetOffers } = props
    onGetOffers()
  }, [])

  useEffect(() => {
    if (id && offers.length !== 0) {
      const offer = offers.filter(offer => { return offer.id === parseInt(id) })[0]
      setOffreToEdit(offer)
    }
  }, [offers])

  const handleSubmit = (e) => {
    const { onAddNewOffer, onUpdateOffer } = props
    e.preventDefault();
    // console.log("This is handleSubmit")
    if (id) {
      onUpdateOffer(offreToEdit);
      setSubmitted(true);
    } else {
      onAddNewOffer(offre);
      setSubmitted(true);
    }
    // addOffre() hathi bech thizna lil fonction eli thiz el offre object lil backend ;)
  };
  //tjib e.target.value t7otou fi e target.name
  const handleChange = (e) => {
    if (id) {
      setOffreToEdit({ ...offreToEdit, [e.target.name]: e.target.value })
    } else {
      setOffre({ ...offre, [e.target.name]: e.target.value })
    }
  };
  //ybadel objet 9dima o yjib les valeurs jdod mel input bel.name
  const handleReset = (e) => {
    // console.log("Reset function")
    e.preventDefault();
    setOffreToEdit
    (initialState);
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>
            {(typeForm === 'add') ? 'Ajout Offre' : 'Modification Offre'} | Recrutement
          </title>
        </MetaTags>
        <Container fluid={true}>
          <Breadcrumbs
            maintitle="Recrutement"
            title="Gestion Offres"
            breadcrumbItem={(typeForm === 'add') ? 'Ajout Offre' : 'Modification Offre'}
          />

          {submitted && id ? (
            <Alert color="success" style={{ marginTop: "13px" }} className="mt-5">
              Product Modified Successfully
            </Alert>
          ) : null}


{submitted && !id ? (
            <Alert color="success" style={{ marginTop: "13px" }} className="mt-5">
              Product Added Successfully
            </Alert>
          ) : null}
          
          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle className="h4">{typeForm === 'add' ? 'Publier une offre' : 'Modifier une offer'}</CardTitle>
                  <p className="card-title-desc">
                  </p>

                  {!id ? (
                    <>
                      <Row className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-label"
                        >
                          Poste
                        </label>
                        <div className="col-md-10">
                          <input
                            onChange={handleChange}
                            name="poste"
                            value={offre.poste}
                            className="form-control"
                            type="text"
                          />
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <label
                          htmlFor="example-search-input"
                          className="col-md-2 col-form-label"
                        >
                          Description
                        </label>
                        <div className="col-md-10">
                          <input
                            onChange={handleChange}
                            name="description"
                            value={offre.description}
                            className="form-control"
                            type="search"
                          />
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <label
                          htmlFor="example-email-input"
                          className="col-md-2 col-form-label"
                        >
                          Emplacement
                        </label>
                        <div className="col-md-10">
                          <input
                            onChange={handleChange}
                            name="emplacement"
                            value={offre.emplacement}
                            className="form-control"
                            type="email"
                          />
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <label
                          htmlFor="example-url-input"
                          className="col-md-2 col-form-label"
                        >
                          Experience
                        </label>
                        <div className="col-md-10">
                          <input
                            onChange={handleChange}
                            value={offre.experience}
                            name="experience"
                            className="form-control"
                            type="text"
                          />
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <label
                          htmlFor="example-tel-input"
                          className="col-md-2 col-form-label"
                        >
                          Type de contrat
                        </label>
                        <div className="col-md-10">
                          <input
                            onChange={handleChange}
                            value={offre.type}
                            name="type"
                            className="form-control"
                            type="text"
                          />
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <label
                          htmlFor="example-password-input"
                          className="col-md-2 col-form-label"
                        >
                          Niveau d'étude
                        </label>
                        <div className="col-md-10">
                          <input
                            onChange={handleChange}
                            value={offre.niveau}
                            name="niveau"
                            className="form-control"
                            type="text"
                          />
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <label
                          htmlFor="example-number-input"
                          className="col-md-2 col-form-label"
                        >
                          Type d'emploi désiré
                        </label>
                        <div className="col-md-10">
                          <input
                            onChange={handleChange}
                            value={offre.typeemploi}
                            name="typeemploi"
                            className="form-control"
                            type="text"
                            id="example-number-input"
                          />
                        </div>
                      </Row>
                    </>
                  ) : (
                    <>
                      <Row className="mb-3">
                        <label
                          htmlFor="example-text-input"
                          className="col-md-2 col-form-label"
                        >
                          Poste
                        </label>
                        <div className="col-md-10">
                          <input
                            onChange={handleChange}
                            name="poste"
                            value={offreToEdit.poste}
                            className="form-control"
                            type="text"
                          />
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <label
                          htmlFor="example-search-input"
                          className="col-md-2 col-form-label"
                        >
                          Description
                        </label>
                        <div className="col-md-10">
                          <input
                            onChange={handleChange}
                            name="description"
                            value={offreToEdit.description}
                            className="form-control"
                            type="search"
                          />
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <label
                          htmlFor="example-email-input"
                          className="col-md-2 col-form-label"
                        >
                          Emplacement
                        </label>
                        <div className="col-md-10">
                          <input
                            onChange={handleChange}
                            name="emplacement"
                            value={offreToEdit.emplacement}
                            className="form-control"
                            type="email"
                          />
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <label
                          htmlFor="example-url-input"
                          className="col-md-2 col-form-label"
                        >
                          Experience
                        </label>
                        <div className="col-md-10">
                          <input
                            onChange={handleChange}
                            value={offreToEdit.experience}
                            name="experience"
                            className="form-control"
                            type="text"
                          />
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <label
                          htmlFor="example-tel-input"
                          className="col-md-2 col-form-label"
                        >
                          Type de contrat
                        </label>
                        <div className="col-md-10">
                          <input
                            onChange={handleChange}
                            value={offreToEdit.type}
                            name="type"
                            className="form-control"
                            type="text"
                          />
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <label
                          htmlFor="example-password-input"
                          className="col-md-2 col-form-label"
                        >
                          Niveau d'étude
                        </label>
                        <div className="col-md-10">
                          <input
                            onChange={handleChange}
                            value={offreToEdit.niveau}
                            name="niveau"
                            className="form-control"
                            type="text"
                          />
                        </div>
                      </Row>
                      <Row className="mb-3">
                        <label
                          htmlFor="example-number-input"
                          className="col-md-2 col-form-label"
                        >
                          Type d'emploi désiré
                        </label>
                        <div className="col-md-10">
                          <input
                            onChange={handleChange}
                            value={offreToEdit.typeemploi}
                            name="typeemploi"
                            className="form-control"
                            type="text"
                            id="example-number-input"
                          />
                        </div>
                      </Row>
                    </>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Button
            color="primary"
            className="m-3 mb-5"
            style={{ marginRight: "5px" }}
            onClick={(e) => handleSubmit(e)}
          >
            {typeForm === 'add' ? 'Ajouter offre' : 'Modifier offer'}
          </Button>
          <Button color="primary" className="m-3 mb-5" onClick={(e) => handleReset(e)}>
            Cancel
          </Button>
        </Container>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ offers }) => ({ offers: offers.offers })

const mapDispatchToProps = dispatch => ({
  onGetOffers: () => dispatch(getOffers()),
  onAddNewOffer: offer => dispatch(addNewOffer(offer)),
  onUpdateOffer: offer => dispatch(updateOffer(offer)),
  onDeleteOffer: offer => dispatch(deleteOffer(offer)),
})


export default connect(mapStateToProps, mapDispatchToProps)(FormElements)
