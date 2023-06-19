import React, {
  FC,
  ReactNode,
  useState,
  createContext,
  useContext
} from "react";

import "./MasterDetail.css";

interface MasterDetailContextType {
  state: any;
  setState: (state: any) => void;
}

// create context with empty default values
const MasterDetailContext = createContext<MasterDetailContextType>(
  {} as MasterDetailContextType
);

interface MasterDetailProps {
  children: ReactNode;
}

interface MasterDetailComponent extends FC<MasterDetailProps> {
  Item: FC<MasterDetailItemProps>;
  Detail: FC<MasterDetailDetailProps>;
}

const MasterDetail: MasterDetailComponent = ({ children }) => {
  const items: ReactNode[] = [];
  const details: ReactNode[] = [];

  // sort children into items and details
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === MasterDetail.Item) items.push(child);
      else if (child.type === MasterDetail.Detail) details.push(child);
    }
  });

  // set state using the payload of the first item, if present
  const [state, setState] = useState(
    (items[0] as React.ReactElement)?.props?.payload || null
  );

  // render items and details within the context provider
  return (
    <MasterDetailContext.Provider value={{ state, setState }}>
      <div className="md-wrapper">
        {items.length > 0 && <div className="md-items">{items}</div>}
        <div className="md-details">{details}</div>
      </div>
    </MasterDetailContext.Provider>
  );
};

// define item prop types
interface MasterDetailItemProps {
  payload: any;
  children: ReactNode;
}

// MasterDetailItem component
const MasterDetailItem: FC<MasterDetailItemProps> = ({ payload, children }) => {
  const { setState } = useContext(MasterDetailContext);

  // render the item and set the payload as state when clicked
  return (
    <div className="md-item" onClick={() => setState(payload)}>
      {children}
    </div>
  );
};

interface MasterDetailDetailProps {
  children: (state: any) => ReactNode;
}

const MasterDetailDetail: FC<MasterDetailDetailProps> = ({ children }) => {
  const { state } = useContext(MasterDetailContext);

  // render the detail, passing the current state to the child function
  return <div className="md-detail">{children(state)}</div>;
};

// assign Item and Detail components to MasterDetail
MasterDetail.Item = MasterDetailItem;
MasterDetail.Detail = MasterDetailDetail;

export default MasterDetail;
