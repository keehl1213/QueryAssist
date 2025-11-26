type TTreeList = {
	[key: string]: TChatMessageTree;
};

type TList = {
	id: string;
	name: string;
}[];

export const OBJECT_ARRAY_REMOVE_DUPLICATE = (objAry: {
	length: number;
	map: (arg0: {
		(
			value: any,
			replacer?: (this: any, key: string, value: any) => any,
			space?: string | number
		): string;
		(
			value: any,
			replacer?: (number | string)[] | null,
			space?: string | number
		): string;
	}) => Iterable<unknown> | null | undefined;
}) => {
	if (objAry?.length > 0) {
		const uniString = new Set(objAry.map(JSON.stringify));
		const uniAry = Array.from(uniString).map((e) =>
			JSON.parse(e as string)
		);
		return uniAry;
	}
	return [];
};

export const GET_CONTEXT_LIST = (treeData: TTreeList): TContextContain[] => {
	if (treeData) {
		const hasContext = Object.values(treeData)
			.filter((e) => e.contextList && e.role === 'user')
			.map((d) => d.contextList);
		if (hasContext?.length > 0) {
			const contextListAry = Array.prototype.concat.apply([], hasContext);
			// 去除空的並轉成字串
			const contextString: string[] = contextListAry
				.filter((e) => e && e !== null)
				.map((e) => JSON.stringify(e));
			// 去重複
			const contextStringFilter: string[] = [...new Set(contextString)];
			// 轉回objArt
			const clearnContext = contextStringFilter.map((e) => JSON.parse(e));
			const hasfile = clearnContext.filter(
				(e) =>
					e.ids?.length > 0 &&
					e.ids[0] &&
					e.filePaths?.length > 0 &&
					e.filePaths[0]
			);
			if (hasfile[0]) {
				return hasfile;
			}
			return clearnContext;
		}
		return [];
	}
	return [];
};

export const CHANGE_ID_TO_NAME = (array: TList, idAry: string[]) => {
	if (array?.length > 0 && idAry?.length > 0) {
		const nameAry = idAry
			.map((id) => {
				const matchObj = array.find((obj) => obj.id === id);
				return matchObj ? matchObj.name : undefined;
			})
			.filter((name) => name !== undefined);
		return nameAry;
	}
	return [];
};

export const GET_KEY_BY_VALUE = (array: { [x: string]: any }, value: any) => {
	const findKey = Object.keys(array).find((key) => array[key] === value);
	return findKey;
};

export const SORT_ARRAY = (array: any[]) => {
	if (array?.length > 0) {
		return array.sort((a, b) => a - b);
	}
	return [];
};

export const SORT_OBJ_ARRAY_VALUE_BY_ARRAY = (
	objArray: { [x: string]: any[] },
	valueOrder: string | any[]
) => {
	const sortedList: { [key: string]: any } = {};
	Object.keys(objArray).forEach((key) => {
		const values = objArray[key].sort(
			(a, b) => valueOrder.indexOf(a) - valueOrder.indexOf(b)
		);
		sortedList[key] = values;
	});
	return sortedList;
};

// 清除所有編輯模式（目前未使用）
export const REMOVE_ALL_EDIT_IN_KEY_ARRAY = (array: TTreeList) => {
	const clearEdit = Object.entries(array).reduce<{ [key: string]: any }>(
		(obj, [key, value]) => {
			obj[key] = {
				...value,
				edit: value.edit === true ? undefined : value.edit,
			};
			return obj;
		},
		{}
	);
	return clearEdit;
};

export const SECONDS_TO_TIME = (totalseconds: number) => {
	const days = Math.floor(totalseconds / (3600 * 24));
	const hours = Math.floor((totalseconds % (3600 * 24)) / 3600);
	const minutes = Math.floor((totalseconds % 3600) / 60);
	const seconds = totalseconds % 60;

	const form = (num: number) => (num < 10 ? `0${num}` : num);

	const formattedTime = `${form(days)}:${form(hours)}:${form(minutes)}:${form(seconds)}`;
	return formattedTime;
};

// ===========binding相關=================

/*
用bindingid分類,產出如下
 {
   "b01":["nodeid1","nodeid2"],
 }
*/
export const GET_BINDING_LIST = (
	tree: { [key: string]: TChatMessageTree },
	idOrder?: string[]
) => {
	let bindList: { [key: string]: any } = {};
	Object.values(tree).forEach((item) => {
		if (item?.bindingId) {
			if (!bindList[item.bindingId]) {
				bindList[item.bindingId] = [];
			}
			bindList[item.bindingId].push(item.id);
		}
	});
	if (idOrder) {
		bindList = SORT_OBJ_ARRAY_VALUE_BY_ARRAY(bindList, idOrder);
	}
	return bindList;
};

export const GET_BINDED_ID_FROM_ARRAY = (
	bindingList: { [x: string]: string | any[] },
	idArray: any[]
) => {
	const bindedIds: any[] = [];
	idArray.forEach((id) => {
		for (const key in bindingList) {
			if (bindingList[key].includes(id)) {
				bindedIds.push(id);
				break;
			}
		}
	});
	return bindedIds;
};

// 找該節點binding group中哪一個有children
export const GET_BINDING_ID_HAS_CHILDREN = (
	chatList: TTreeList,
	bindingList: { [x: string]: any[] },
	nodeId: TChatMessageTree
) => {
	if (nodeId?.bindingId) {
		const filerHasChildren = bindingList[nodeId.bindingId]?.filter(
			(nId) => (chatList[nId]?.children?.length || 0) > 0
		);
		if (filerHasChildren?.length > 0) {
			return filerHasChildren[0];
		}
	}
	return undefined;
};

// 找每個bindingId對應的SelectId,格式:{"b01":"nodeid1"}
export const GET_BINDING_SELECT_ID_LIST = (
	bindingList: { [x: string]: any },
	chatList: { [x: string]: any }
) => {
	const selectIdMapping = Object.keys(bindingList).reduce<{
		[key: string]: any;
	}>((resultList, key) => {
		const hasChildrenNodeId = bindingList[key].find(
			(id: string) => chatList[id]?.children?.length > 0
		);
		if (hasChildrenNodeId) {
			resultList[key] = hasChildrenNodeId;
		}
		return resultList;
	}, {});
	return selectIdMapping;
};
// ===========================節點相關================================

export const CLEAR_USELESS_BINDING_NODE = (tree: TTreeList) => {
	const bindingList = GET_BINDING_LIST(tree);
	const bindingSelectId = GET_BINDING_SELECT_ID_LIST(bindingList, tree);
	const newTree: TTreeList = {};
	const clearTree = Object.values(tree).filter((e) => {
		if (e.bindingId) {
			const selectId = bindingSelectId[e.bindingId];
			if (selectId && selectId !== e.id) {
				return null;
			}
			return e;
		}
		return e;
	});

	clearTree.forEach((e) => {
		if (e) {
			newTree[e.id] = e;
		}
	});

	// 檢查children有沒有在tree中,也要移除
	const treeContainKeys = Object.keys(newTree);
	Object.values(newTree).forEach((e) => {
		if ((e.children?.length || 0) > 0) {
			const filterChildren = e.children?.filter((cId: string) =>
				treeContainKeys.includes(cId)
			);
			newTree[e.id].children = filterChildren;
		}
	});

	return newTree;
};

// 往下找節點
export const FIND_CHILDREN_NODES = (
	node: TChatMessageTree,
	nodeList: { [x: string]: any }
): any[] => {
	const path = (node && [node.id]) || [];
	if (node.children && (node?.children?.length || 0) > 0) {
		const firstChild = nodeList[node.children[0]];
		return path.concat(FIND_CHILDREN_NODES(firstChild, nodeList));
	}
	return path;
};

export const GET_NODE_CHILDRENLIST = (
	nodeId: any,
	nodeList: { [x: string]: any }
) => {
	if (nodeList) {
		const getChildren = Object.keys(nodeList).filter(
			(id) => nodeList[id].parent === nodeId
		);
		const getNode = getChildren.map((e) => nodeList[e]);
		return getNode;
	}
	return [];
};

// 取得該節點所有的子節點(含子節點的子節點) allLevel:起始陣列
export const GET_ALL_CHILDREN_BRANCH = (
	nodeList: any,
	allLevel: any[],
	nowlevel: any[]
): any[] => {
	if (nowlevel.length < 1) {
		return allLevel;
	}
	const nexLevel: any[] = [];
	nowlevel.forEach((e) => {
		if (e.id) {
			const thisChildren = GET_NODE_CHILDRENLIST(e.id, nodeList);
			allLevel.push(...thisChildren);
			nexLevel.push(...thisChildren);
		}
	});
	return GET_ALL_CHILDREN_BRANCH(nodeList, allLevel, nexLevel);
};

// 找根節點
export const FIND_ROOT_ID = (nodeList: { [x: string]: any }) => {
	const list =
		nodeList &&
		Object.keys(nodeList).filter(
			(nodeId) => nodeList[nodeId].parent === null
		);
	return list;
};

// 找最後一個回答的節點_by obj array
export const FIND_OBJ_LAST_ANS_NODE = (nodeList: TTreeList) =>
	nodeList &&
	Object.values(nodeList)
		.filter((obj) => obj.role === 'assistant')
		.pop();

// 找最後一個回答的節點_by chatIdList
export const FIND_LAST_ANS_ID = (nodeList: TTreeList, idList: string[]) =>
	idList.filter((id) => nodeList[id].role === 'assistant').pop();

// 找到同層的節點(他的parents有幾個children)
export const FIND_SAME_LEVEL_NODES = (
	nodeId: string | number,
	nodeList: { [x: string]: any }
) => {
	const parentId = nodeList[nodeId]?.parent;
	if (parentId) {
		try {
			const parentChildren = nodeList[parentId].children;
			return parentChildren;
		} catch (e) {
			console.log(e);
			console.log('[Error] parentId', parentId);
			console.log('[Error] nodeList', nodeList);
			return [];
		}
	}
	return [];
};

// 找該節點的parentsId
export const FIND_PARENTS_ID = (
	nodeId: string | number,
	nodeList: { [x: string]: any }
) => {
	let parentsId = null;
	const currentNode = nodeList[nodeId];
	if (currentNode.parent !== null) {
		parentsId = currentNode.parent;
	}
	return parentsId;
};

export const REMOVE_OBJ_FAIL_NODE = (nodeList: { [x: string]: any }) =>
	nodeList &&
	Object.keys(nodeList)?.reduce<{ [x: string]: any }>((obj, key) => {
		if (nodeList[key]?.status !== 'U') {
			obj[key] = nodeList[key];
		}
		return obj;
	}, {});

export const GET_NODE_LIST_FROM_STATUS = (tree: TTreeList, findStatus: any) => {
	const filterValueList = Object.values(tree)?.filter(
		(e) => e.status === findStatus
	);
	return filterValueList?.map((e) => e.id) || [];
};

/**
 * 檢查檔案名稱是否包含不允許的字元
 * @param fileName 檔案名稱
 * @returns 回傳一個物件，包含是否合法(isValid)及不允許的字元(invalidChars)。isValid: boolean；invalidChars: string[]。
 */
export const CHECK_FILE_NAME_CONTAIN_SPECIAL_CHARACTERS = (
	fileName: string
) => {
	// 定義不允許的字元集合 正斜杠 / 反斜杠 \ 問號 ? 百分比 % 星號 * 冒號 : 豎線 | 雙引號 " 大於小於 <> 加號 + 井號 #
	const disallowedChars = /[\\/?%*:|"<>+#]/;

	// 檢查檔案名稱是否包含不允許的字元
	const invalidChars = fileName
		?.split('')
		.filter((char) => disallowedChars.test(char));

	// 如果沒有不允許的字元，返回合法狀態
	if (invalidChars.length === 0) {
		return { isValid: true, invalidChars: [] }; // 檔案名稱合法
	}

	// 返回非法字元的陣列
	return { isValid: false, invalidChars }; // 檔案名稱包含特殊字元
};

/**
 * 檢查表單資料的授權清單(特定欄位)是否為機敏資料
 * @param values 表單資料
 * @returns true: 機敏資料, false: 公開資料
 */
export const CHECK_AUTH_FOR_AUTHATTTRIBUTE = (values: {
	location: any;
	role: any;
	officerLevel: any;
	users: any;
	department: any;
}) => {
	const { location, role, officerLevel, users, department } = values;
	if (
		location?.length === 0 &&
		role?.length === 0 &&
		officerLevel === 'all' &&
		users?.length === 0 &&
		department?.length === 0
	) {
		return false;
	}
	return true;
};

/**
 * 根據語系顯示對應的名稱，並做防呆處理(如果沒有英文名稱，則統一顯示name)
 * @param lang 語系
 * @param item 被選中的物件(plugin或agent)
 * @returns 對應語系的名稱
 */
export const GET_SELECTED_ITEM_NAME = (
	lang: string,
	item: { englishDisplayName?: any; name?: any }
) => {
	if (
		lang === 'en-US' &&
		Object.keys(item).includes('englishDisplayName') &&
		item.englishDisplayName !== null
	) {
		return item.englishDisplayName;
	}
	return item.name;
};
