type FlexPlaces = 'row' | 'column';
type FlexSpaces = 'space-around' | 'space-between';
type FlexPositions = 'center' | 'flex-start' | 'flex-end';
type Containments = `${FlexPlaces}:${FlexSpaces | FlexPositions}`;

type Colors = {
    backgroundColor: string,
    color: string,
}
type Decorations = {
    boxShadow: string,
    border: string,
}
type MargPad = {
    margin: string,
    padding: string,
}

type ContainerSuite = MargPad & Decorations & Colors

interface ContainerProps extends ContainerSuite {
    containment: Containments,
}


export class UI_Generator {

    private containerProps: Partial<ContainerProps> = {};
    private interactionProps: Record<string, Function> = {};

    contain(props: Partial<ContainerProps>) {
      const {
        containment,
        border,
        boxShadow,
        backgroundColor,
        color,
        margin,
        padding
      } = props;
      switch (containment) {
        case containment:
            const [
                place,
                position,
            ]
             = containment!.split(':') as [`${FlexPlaces}`, `${FlexPositions | FlexSpaces}`];
            return {
                display: 'flex',
                flexDirection: place,
                justifyContent: position,
                alignItems: position,
                border,
                boxShadow,
                color,
                margin,
                padding,
                backgroundColor
            }
      }
    }

    interact() {
        const interactionMethods = {
            onPress: (callback: (arg: any) => any) => {
                this.interactionProps.onPress = callback;
                return callback;
            },
            onHoverStart: (callback: (arg: any) => any) => {
                this.interactionProps.onHoverStart = callback;
                return callback;
            },
            onHoverEnd: (callback: (arg: any) => any) => {
                this.interactionProps.onHoverEnd = callback;
                return callback;
            },
            onFocus: (callback: (arg: any) => any) => {
                this.interactionProps.onFocus = callback;
                return callback;
            },
            onBlur: (callback: (arg: any) => any) => {
                this.interactionProps.onBlur = callback;
                return callback;
            },
            onDoublePress: (callback: (arg: any) => any) => {
                this.interactionProps.onDoublePress = callback;
                return callback;
            },
            onPressNHold: (callback: (arg: any) => any) => {
                this.interactionProps.onPressNHold = callback;
                return callback;
            },
            onScrollUp: (callback: (arg: any) => any) => {
                this.interactionProps.onScrollUp = callback;
                return callback;
            },
            onScrollDown: (callback: (arg: any) => any) => {
                this.interactionProps.onScrollDown = callback;
                return callback;
            }
        };

        return interactionMethods;
    }

    assemble() {
        return {
            styles: this.containerProps,
            props: this.interactionProps
        };
    }
}