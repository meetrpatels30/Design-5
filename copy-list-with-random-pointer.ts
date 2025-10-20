/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     next: _Node | null
 *     random: _Node | null
 *
 *     constructor(val?: number, next?: _Node, random?: _Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *         this.random = (random===undefined ? null : random)
 *     }
 * }
 */

// Time complexity - O(n), n is the number of elements in the list
// Space complexity - O(1), no extra space used
function copyRandomList(head: _Node | null): _Node | null {
	if (head === null) return null;

	let curr: _Node | null = head;

	// create Deep Copies and add them into original List (A -> A' -> B -> B' ...)
	while (curr !== null) {
		// create a copy node
		const copyCurr = new _Node(curr.val);

		// insert the copy node immediately after the original node
		copyCurr.next = curr.next;
		curr.next = copyCurr;

		// move curr to the next original node (skipping the new copy)
		curr = copyCurr.next;
	}

	// reset curr to original head
	curr = head;

	// set random pointers for the copy Nodes
	while (curr !== null) {
		// copy's random pointer (curr.next.random) should point to the copy of the original target (curr.random.next)
		if (curr.random !== null) {
			curr.next.random = curr.random.next;
		}

		// move curr to the next original node. Skipping copy nodes in the list (A -> A' -> B -> B' ...)
		curr = curr.next.next;
	}

	curr = head;
	let copyHead: _Node | null = curr.next;
	let copyCurr: _Node | null = copyHead;

	//  separate original list from the copy list
	while (curr !== null) {
		// reconnect original nodes in original list
		curr.next = curr.next!.next;

		// reconnect the nodes in copy list
		if (copyCurr.next !== null) {
			copyCurr.next = copyCurr.next.next;
		}

		curr = curr.next;
		copyCurr = copyCurr.next;
	}

	return copyHead;
}
