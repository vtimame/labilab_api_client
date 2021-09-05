import React from 'react';
import classNames from 'classnames';
import { ContextMenu as BPContextMenu } from '@blueprintjs/core';

export class ContextMenu extends React.PureComponent<
  any,
  { isContextMenuOpen: boolean }
> {
  public state = { isContextMenuOpen: false };

  public render() {
    const classes = classNames('context-menu-node', {
      'context-menu-open': this.state.isContextMenuOpen,
    });
    return (
      <div className={classes} onContextMenu={this.showContextMenu}>
        {this.props.children}
      </div>
    );
  }

  private showContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    BPContextMenu.show(
      this.props.menu,
      { left: e.clientX, top: e.clientY },
      () => this.setState({ isContextMenuOpen: false })
    );
    this.setState({ isContextMenuOpen: true });
  };
}
