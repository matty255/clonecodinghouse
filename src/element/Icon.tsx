import React from 'react'
import { ReactComponent as Download } from '../static/Download.svg';
import { ReactComponent as Delete } from '../static/Delete.svg';
import { ReactComponent as Cancel } from '../static/Cancel.svg';
import { ReactComponent as Dots } from '../static/Dots.svg';

interface IconProps {
  name: string,
  iconSize?: number,

}

const Icon = ({ name = 'download', iconSize = 14 }: IconProps) => {
  if (name === 'download') {
    return (

                <Download width={iconSize} height={iconSize} className="pointer-events-none" />

    )
  }
  if (name === 'delete') {
    return (

                <Delete width={iconSize} height={iconSize} className="pointer-events-none" />

    )
  }
  if (name === 'cancel') {
    return (
    
                <Cancel width={iconSize} height={iconSize} className="pointer-events-none" />

    )
  }
  if (name === 'dots') {
    return (

                <Dots width={iconSize} height={iconSize} className="pointer-events-none" />
 
    )
  } else return null
}

Icon.defaultProps = {
  name: 'download',
  iconSize: 14,
}

export default Icon
