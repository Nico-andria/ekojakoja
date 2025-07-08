import styles from "../../assets/css/VerticalProgress.module.css";
import check from "../../assets/Icones/check.png";
import PropTypes from "prop-types";

const VerticalProgress = ({ items }) => {
  const steps = [
    {
      id: 1,
      title: "Achat effectué",
      activeCondition: (statut) =>
        [
          "Achat effectué",
          "Arrivé à l'entrepôt en Chine",
          "En transit vers Madagascar",
          "En Douane à Madagascar",
          "Colis arrivé",
        ].includes(statut),
    },
    {
      id: 2,
      title: "Arrivé à l'entrepôt en Chine",
      activeCondition: (statut) =>
        [
          "Arrivé à l'entrepôt en Chine",
          "En transit vers Madagascar",
          "En Douane à Madagascar",
          "Colis arrivé",
        ].includes(statut),
    },
    {
      id: 3,
      title: "En transit vers Madagascar",
      activeCondition: (statut) =>
        [
          "En transit vers Madagascar",
          "En Douane à Madagascar",
          "Colis arrivé",
        ].includes(statut),
    },
    {
      id: 4,
      title: "En Douane à Madagascar",
      activeCondition: (statut) =>
        ["En Douane à Madagascar", "Colis arrivé"].includes(statut),
      showCondition: (item) => item.Envoi.includes("Maritime"),
    },
    {
      id: 5,
      title: "Colis arrivé",
      activeCondition: (statut) => statut === "Colis arrivé",
      finalStep: true,
    },
  ];
  // const steps = [
  //   {
  //     id: 1,
  //     title: "Achat effectué",
  //     activeCondition: (statut) =>
  //       [
  //         "ACHAT EFFECTUE",
  //         "ENTREPOT CHINE",
  //         "EN TRANSIT",
  //         "EN DOUANE MDG",
  //         "ARRIVEE A MDG",
  //       ].includes(statut),
  //   },
  //   {
  //     id: 2,
  //     title: "Arrivé à l'entrepôt en Chine",
  //     activeCondition: (statut) =>
  //       [
  //         "ENTREPOT CHINE",
  //         "EN TRANSIT",
  //         "EN DOUANE MDG",
  //         "ARRIVEE A MDG",
  //       ].includes(statut),
  //   },
  //   {
  //     id: 3,
  //     title: "En transit vers Madagascar",
  //     activeCondition: (statut) =>
  //       ["EN TRANSIT", "EN DOUANE MDG", "ARRIVEE A MDG"].includes(statut),
  //   },
  //   {
  //     id: 4,
  //     title: "En Douane à Madagascar",
  //     activeCondition: (statut) =>
  //       ["EN DOUANE MDG", "ARRIVEE A MDG"].includes(statut),
  //     showCondition: (item) => item.Envoi.includes("Maritime"),
  //   },
  //   {
  //     id: 5,
  //     title: "Colis arrivé",
  //     activeCondition: (statut) => statut === "ARRIVEE A MDG",
  //     finalStep: true,
  //   },
  // ];

  return (
    <div className={styles.timeline}>
      {items.map((item, index) => {
        const visibleSteps = steps.filter(
          (step) => !step.showCondition || step.showCondition(item)
        );

        const adjustedSteps = visibleSteps.map((step, i) => ({
          ...step,
          displayId: i + 1,
        }));

        return (
          <div className={styles.progression} key={index}>
            <ul>
              {adjustedSteps.map((step, stepIndex) => {
                const isActive = step.activeCondition(item.Statut);
                const isLast =
                  step.finalStep || stepIndex === adjustedSteps.length - 1;

                return (
                  <li key={step.id}>
                    <div
                      className={`${styles.progress} ${
                        isActive ? styles.active : ""
                      }`}
                    >
                      {isActive ? (
                        <img src={check} width={20} />
                      ) : (
                        step.displayId
                      )}
                      {/* {isActive ? "✓" : step.displayId} */}
                    </div>
                    <p className={styles.text}>{step.title}</p>
                    {!isLast && (
                      <div
                        className={`${styles.connector} ${
                          isActive ? styles.active : ""
                        }`}
                      ></div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

VerticalProgress.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      Statut: PropTypes.string.isRequired,
      Envoi: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default VerticalProgress;
