
type LooseFunc = (data: any) => any;

type Concrete<T> = {
    [K in keyof T]-?: T[K];
};

type ItemProps = Pick<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onMouseEnter' | 'onMouseLeave' | 'onClick' | 'onDoubleClick'>;

interface ListableProps {
    listItems: any[],
    itemProps?: Partial<ItemProps>
}
const Listable: React.FC<ListableProps> = ({
    listItems,
    itemProps,
}) => {

    const { 
        onChange,
        onClick,
        onDoubleClick,
        onMouseEnter,
        onMouseLeave
    } = itemProps as Concrete<ItemProps>

    return (
        <div className="list">
            {
                listItems.map((item) => {
                    return (
                        <div 
                        onChange={onChange}
                        onClick={onClick}
                        onDoubleClick={onDoubleClick}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        className="item"
                        >
                            {
                                item
                            }
                        </div>
                    )
                })
            }
        </div>
    )

}

export default Listable