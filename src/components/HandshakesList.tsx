import { PropsWithChildren, ReactNode } from "react";
import Loading from "./Loading";
import { ImFileEmpty } from "react-icons/im";

interface Props<T> {
  loading: boolean;
  list: T[];
  renderItem: (item: T) => ReactNode;
}

const HandshakesList = <T extends unknown>(
  props: PropsWithChildren<Props<T>>
) => {
  return (
    <div>
      {props.loading ? (
        <div className="py-20 text-2xl">
          <Loading />
        </div>
      ) : props.list.length > 0 ? (
        props.list.map(props.renderItem)
      ) : (
        <div className="text-center py-20 flex justify-center items-center space-x-2">
          <ImFileEmpty /> <p>Empty</p>
        </div>
      )}
    </div>
  );
};

export default HandshakesList;
