import { ClientFunction, Selector } from 'testcafe';

export abstract class BasePage {

    getUrl(): Promise<string> {
        return ClientFunction((): string => document.location.href)();
    }

    goBack() {
        return ClientFunction(() => window.history.back())();
    }

    protected selectElement = (
        text:
            | string
            | ((...args: any[]) => Node | Node[] | NodeList | HTMLCollection)
            | Selector
            | NodeSnapshot
            | SelectorPromise,
        options?: SelectorOptions
    ): Selector => Selector(text, options);

    reloadPage() {
        return ClientFunction(() => location.reload())();
    }

    numberOfElements = async (element: Selector): Promise<number> => {
        return await element.count;
    };

    findIndexByText = async (text: string, element: Selector): Promise<number> => {
        const noOfElements = await this.numberOfElements(element);
        for (let i = 0; i < noOfElements; ++i) {
            if ((await element.nth(i).textContent).trim() === text.trim()) {
                return i;
            }
        }
        throw new Error(`Element with text "${text}" and selector ${element} not found`);
    };

}
