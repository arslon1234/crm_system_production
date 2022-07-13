import React from "react";

export default function TabSwitchers({
  onChangeTab,
  activeTab,
  tabList,
  widthSwitcher,
}) {
  return (
    <div className="select-top-menu-bar" style={{ width: `${widthSwitcher}` }}>
      {tabList.map((x) => (
        <div key={x.id}>
          <p
            onClick={() => onChangeTab(x.name)}
            className={`${activeTab === x.name && "active-tab"}`}
          >
            {x.title}
          </p>
          {/*<span/>*/}
        </div>
      ))}
    </div>
  );
}
