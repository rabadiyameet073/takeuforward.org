export const LANGUAGES = ["C++", "Python", "JavaScript", "Java", "Go", "TypeScript"] as const;
export type Lang = (typeof LANGUAGES)[number];

export const LANG_COLORS: Record<Lang, string> = {
  "C++": "text-blue-400",
  Python: "text-yellow-400",
  JavaScript: "text-amber-400",
  Java: "text-red-400",
  Go: "text-cyan-400",
  TypeScript: "text-blue-300",
};

export const LANG_ICONS: Record<Lang, string> = {
  "C++": "⚡",
  Python: "🐍",
  JavaScript: "✨",
  Java: "☕",
  Go: "🐹",
  TypeScript: "🔷",
};

export const CODE_SNIPPETS: Record<Lang, string> = {
  "C++": `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> mp;
        for (int i = 0; i < nums.size(); i++) {
            int diff = target - nums[i];
            if (mp.count(diff))
                return {mp[diff], i};
            mp[nums[i]] = i;
        }
        return {};
    }
};`,
  Python: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        mp = {}
        for i, num in enumerate(nums):
            diff = target - num
            if diff in mp:
                return [mp[diff], i]
            mp[num] = i
        return []`,
  JavaScript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    const mp = new Map();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (mp.has(diff))
            return [mp.get(diff), i];
        mp.set(nums[i], i);
    }
    return [];
};

console.log(twoSum([2, 7, 11, 15], 9));`,
  Java: `import java.util.HashMap;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> mp = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int diff = target - nums[i];
            if (mp.containsKey(diff))
                return new int[]{mp.get(diff), i};
            mp.put(nums[i], i);
        }
        return new int[]{};
    }
}`,
  Go: `func twoSum(nums []int, target int) []int {
    mp := make(map[int]int)
    for i, num := range nums {
        diff := target - num
        if j, ok := mp[diff]; ok {
            return []int{j, i}
        }
        mp[num] = i
    }
    return []int{}
}`,
  TypeScript: `function twoSum(nums: number[], target: number): number[] {
    const mp = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (mp.has(diff))
            return [mp.get(diff)!, i];
        mp.set(nums[i], i);
    }
    return [];
}`,
};

export const fileExt: Record<Lang, string> = {
  "C++": "twoSum.cpp",
  Python: "two_sum.py",
  JavaScript: "twoSum.js",
  Java: "Solution.java",
  Go: "two_sum.go",
  TypeScript: "twoSum.ts",
};
