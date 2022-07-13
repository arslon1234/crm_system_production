import React from "react";


export default function TabSwitcher({onChangeTab, activeTab, tabList, widthSwitcher, director}) {
    return (
        <div className="select-top-menu-bar" style={{width: `${widthSwitcher}`, color:"#757575"}}>
            {tabList.map(x => (
                    <div key={x.id}>
                        {director ? <p onClick={() => onChangeTab(x.id)} className={`${activeTab === x.id && "active-tab"}`}>{x.title}</p> :
                            <p onClick={() => onChangeTab(x.name)} className={`${activeTab === x.name && "active-tab"}`}>{x.label}</p> }
                        {/*<span/>*/}
                    </div>
                )
            )
            }
        </div>
    )
}