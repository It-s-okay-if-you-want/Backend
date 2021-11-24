
export function CheckCategory(category: number): string {
	switch (category) {
		case 1:
			return "기뻐요";
		case 2:
			return "웃겨요";
		case 3:
			return "슬퍼요";
		case 4:
			return "무서워요";
		case 5:
			return "여기에요";
		case 6:
			return "조심해요";
		case 7:
			return "추천해요";
		case 8:
			return "같이해요";
	}
}