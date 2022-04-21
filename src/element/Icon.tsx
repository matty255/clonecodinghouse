import React from 'react'
import { ReactComponent as Download } from '../static/Download.svg'
import { ReactComponent as Delete } from '../static/Delete.svg'
import { ReactComponent as Cancel } from '../static/Cancel.svg'
import { ReactComponent as Dots } from '../static/Dots.svg'

interface IconProps {
  name: string,
  iconSize?: number,
  className: string,
  onClick: Function
}

const Icon = ({ name = 'download', iconSize = 14, className = '', onClick = () => {} }: IconProps) => {
  if (name === 'download') {
    return (
            <div className={className} onClick={() => onClick}>
                <Download width={iconSize} height={iconSize} />
            </div>
    )
  }
  if (name === 'delete') {
    return (
            <div className={className} onClick={() => onClick}>
                <Delete width={iconSize} height={iconSize} />
            </div>
    )
  }
  if (name === 'cancel') {
    return (
            <div className={className} onClick={() => onClick}>
                <Cancel width={iconSize} height={iconSize} />
            </div>
    )
  }
  if (name === 'dots') {
    return (
            <div className={className} onClick={() => onClick}>
                <Dots width={iconSize} height={iconSize} />
            </div>
    )
  } else return null
}

Icon.defaultProps = {
  name: 'download',
  iconSize: 14,
  className: '',
  onClick: () => {}
}

export default Icon
