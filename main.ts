
/**
 * Cutebot Pro V2
 * Cutebot Pro V2 is a robot that can cut and slice. by @Eleckfreak.
 */
//% weight=100 color=#0fbc11 icon="\uf29b" block="Cutebot Pro V2"
namespace cutebotProV2 {

    enum WheelEnum {
        //% block="Left"
        Left = 0,
        //% block="Right"
        Right = 1,
        //% block="Both"
        Both = 2
    }


    /******************************************************************************************************
     * 工具函数
     ******************************************************************************************************/
    function i2cCommandSend(command: number, params: number[]) {
        let buff = pins.createBuffer(params.length + 4);
        buff[0] = 0xFF; // 帧头
        buff[1] = 0xF9; // 帧头
        buff[2] = command; // 指令
        buff[3] = params.length; // 参数长度
        for (let i = 0; i < params.length; i++) {
            buff[i + 4] = params[i];
        }
        pins.i2cWriteBuffer(tpbotAdd, buff);
    }

    /**
     * motorControl
     */
    export function motorControl(wheel: WheelEnum, leftSpeed: number, rightSpeed: number): void {

        let direction: number = 0;

        if (leftSpeed < 0) {
            direction |= 0x01;
        }

        if (rightSpeed < 0) {
            direction |= 0x2;
        }

        i2cCommandSend(0x10, [wheel, Math.abs(leftSpeed), Math.abs(rightSpeed), direction]);

    }

    //% blockId=fullSpeedFoward block="Full Speed Foward"
    export function fullSpeedFoward(): void {
        motorControl(WheelEnum.Both, 100, 100);
    }

    //% blockId=fullSpeedBackward block="Full Speed Backward"
    export function fullSpeedBackward(): void {
        motorControl(WheelEnum.Both, -100, -100);
    }

}