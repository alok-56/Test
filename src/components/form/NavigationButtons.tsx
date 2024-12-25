import React from "react";
import { Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

interface INavigationButtonsProps {
  current: number;
  totalSteps: number;
  prevClick: () => void;
  nextClick: () => void;
  doneClick: () => void;
}

const NavigationButtons: React.FC<INavigationButtonsProps> = ({
  current,
  totalSteps,
  prevClick,
  nextClick,
  doneClick,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;
  const userPath =
    pathname === "/user-form" || pathname === "/update-user-form"||pathname === "/v1/user-form"||pathname === "/v1/update-user-form";
  const hiringPath = pathname === "/v1/hiring-form";
  return (
    <div>
      {userPath ? (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={prevClick} disabled={current <= 0}>
            Back
          </Button>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {current < totalSteps - 1 && (
              <Button type="primary" onClick={nextClick}>
                Next
              </Button>
            )}
            {current === totalSteps - 1 && (
              <Button type="primary" onClick={doneClick}>
                Done
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {hiringPath ? (
            <Button type="primary" onClick={() => navigate("/v1/hiring")}>
              Cancel
            </Button>
          ) : (
            <Button type="primary" onClick={() => navigate("/login")}>
              Go to Home
            </Button>
          )}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              onClick={prevClick}
              disabled={current <= 0}
              style={{ marginRight: "20px" }}
            >
              Previous
            </Button>
            {current < totalSteps - 1 ? (
              <Button type="primary" onClick={nextClick}>
                Next
              </Button>
            ) : (
              <Button type="primary" onClick={doneClick}>
                {hiringPath ? "Update" : "Register"}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationButtons;
