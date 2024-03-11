import { BindingOrValue } from "@rbxts/pretty-react-hooks";
import React, { useContext } from "@rbxts/react";
import { palette } from "../../../constants/palette";
import { SUGGESTION_TEXT_SIZE } from "../../../constants/text";
import { usePx } from "../../../hooks/usePx";
import { OptionsContext } from "../../../providers/optionsProvider";
import { Suggestion } from "../../../types";
import { Frame } from "../../interface/Frame";
import { Group } from "../../interface/Group";
import { Padding } from "../../interface/Padding";
import { Text } from "../../interface/Text";
import { highlightMatching } from "./util";

export interface SuggestionListProps {
	suggestion?: Suggestion;
	currentText?: string;
	size: BindingOrValue<UDim2>;
}

export function SuggestionList({
	suggestion,
	currentText,
	size,
}: SuggestionListProps) {
	const px = usePx();
	const options = useContext(OptionsContext);

	return (
		<Group
			size={size}
			event={{
				MouseEnter: () => options.setMouseOnGUI(true),
				MouseLeave: () => options.setMouseOnGUI(false),
			}}
		>
			<uilistlayout SortOrder="LayoutOrder" Padding={new UDim(0, px(8))} />

			{suggestion?.others?.map((name, i) => {
				return (
					<Frame
						key={`${i}-${name}`}
						size={new UDim2(1, 0, 0, px(SUGGESTION_TEXT_SIZE + 6))}
						backgroundColor={palette.mantle}
						backgroundTransparency={options.backgroundTransparency}
						cornerRadius={new UDim(0, px(8))}
						clipsDescendants={true}
					>
						<Padding all={new UDim(0, px(4))} />

						<Text
							size={new UDim2(1, 0, 1, 0)}
							text={highlightMatching(name, currentText)}
							textColor={palette.text}
							textSize={px(SUGGESTION_TEXT_SIZE)}
							textXAlignment="Left"
							richText={true}
						/>
					</Frame>
				);
			})}
		</Group>
	);
}
