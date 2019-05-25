import React, { Component } from 'react'
import { Empty } from 'antd';

export class NotFound extends Component {
    render() {
        return (
            <Empty 
            description={
              <span>
                Could not find a related page.
              </span>
            }/>
        )
    }
}

export default NotFound
