'use client'

import ButtonCardProps from "./type/button-card-props";
import './styles.scss'
import { FunctionComponent } from "react";
import Icon from "../icon/icon";
import ButtonFab from "../button-fab/button-fab";


const ButtonCard: FunctionComponent<ButtonCardProps> = ({
  className,
  title,
  iconName
}) => {
  return (
    <div className={`button-card ${className}`}>
      <div className="button-card-top">
        <div className="title">
          <Icon iconName={iconName} />
          <p>
            {title}
          </p>
        </div>
        <ButtonFab icon="add" type="mini" />
      </div>

      <div className="button-card-bottom">
        <p>2 New client</p>
      </div>
    </div>
  )
}

export default ButtonCard;