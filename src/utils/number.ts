interface RandomOptions {
    min: number;
    max: number;
}

export const random = ({ min = 1, max = 10 }: RandomOptions) => Math.floor(Math.random() * (max - min + 1)) + min;