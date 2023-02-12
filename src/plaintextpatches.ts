/*
i.render = function() {
                var e, t = this, n = this.props, o = n.channel, i = n.guild, a = n.selected, l = n.muted, u = n.unread, c = n.canHaveDot, s = n.relevant, f = n.hasActiveThreads, d = n.hasMoreActiveThreads, p = n.mentionCount, h = n.connectChannelDropTarget, y = n.connectChannelDragSource, v = n.connectDragPreview, b = n.canReorderChannel, m = n.isSubscriptionGated, g = n.isFavoriteSuggestion, E = d, j = Ti(n.subtitle), S = (0,
                r.jsx)("li", {
                    className: O()(this.getClassName(), (e = {},
                    qi(e, un().disabled, this.isDisabled()),
                    qi(e, un().selected, a),
                    e)),
                    "data-dnd-name": o.name,
                    onMouseEnter: E ? this.handleMouseEnter : void 0,
                    onMouseLeave: E ? this.handleMouseLeave : void 0,
                    children: (0,
                    r.jsx)(Lo.ZP, {
                        position: Lo.ZP.Positions.RIGHT,
                        renderPopout: this.renderThreadsPopout,
                        onRequestClose: this.handleThreadsPopoutClose,
                        spacing: 0,
                        shouldShow: E && this.state.shouldShowThreadsPopout,
                        children: function() {
                            return (0,
                            r.jsxs)(wn.Z, {
                                className: un().iconVisibility,
                                channel: o,
                                guild: i,
                                selected: !g && a,
                                muted: l,
                                unread: u,
                                canHaveDot: c,
                                relevant: s,
                                mentionCount: p,
                                hasActiveThreads: f,
                                subtitle: null == j ? void 0 : j.subtitle,
                                subtitleColor: null == j ? void 0 : j.color,
                                onMouseDown: t.handleMouseDown,
                                onContextMenu: t.handleContextMenu,
                                connectDragPreview: b ? v : null,
                                isFavoriteSuggestion: g,
                                "aria-label": (0,
                                ro.Z)({
                                    channel: o,
                                    unread: u,
                                    mentionCount: p,
                                    isSubscriptionGated: m
                                }),
                                children: [g && t.renderAcceptSuggestionButton(), g && t.renderRemoveSuggestionButton(), !g && t.renderInviteButton(), !g && t.renderEditButton(), !g && t.renderChannelInfo()]
                            })
                        }
                    })
                });
                return b ? h(y(S)) : S
            }
            ;
            return o
        }(_n)
        */

import { webpack } from "replugged";

webpack.patchPlaintext([
    {
        replacements: [
            {
                match: /(className:[a-zA-Z]+\(\)\(this\.getClassName\(\),\()([a-zA-Z]+)(={},[a-zA-Z]+\([a-zA-Z]+,[a-zA-Z]+\(\)\.disabled,this\.isDisabled\(\)\),[a-zA-Z]+\([a-zA-Z]+,[a-zA-Z]+\(\)\.selected,[a-zA-Z]+\))(,[a-zA-Z]+\)\))/,
                replace: "$1$2$3,($2['rs-chan-hidden']=(this.props.position < 0)),(this.props.position=this.props.channel.position_)$4"
            }
        ]
    },
])