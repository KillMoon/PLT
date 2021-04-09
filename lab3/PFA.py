import os

# Word/string input
start_input = ""     

# Stores found state
found = 0            

# Production rules ("read input", "pop stack", "push stack", "next state")
productions = {}

# All states
states = []

# List of alphabet symbols
symbols = []

# List of stack alphabet symbols
stack_symbols = []

# Start state
start_symbol = ""

# Start stack symbol
stack_start = ""

# List of acceptable states
acceptable_states = []

# F - acceptable state (default is false)
accept_with = ""


# Probability tree generation
def generate(state, input, stack, config):
	global productions
	global found

	total = 0

	if found:
		return 0

	if is_found(state, input, stack):
		found = 1 
		return 1

	moves = get_moves(state, input, stack, config)
	if len(moves) == 0:
		return 0

	for i in moves:
		total = total + generate(i[0], i[1], i[2], config + [(i[0], i[1], i[2])])  

	return total


# Checks if symbol is terminal or non-terminal
def get_moves(state, input, stack, config):
	global productions

	moves = []

	for i in productions:

		if i != state:
			continue

		for j in productions[i]:
			current = j
			new = []

			new.append(current[3])

			if len(current[0]) > 0:
				if len(input) > 0 and input[0] == current[0]:
					new.append(input[1:])
				else:
					continue
			else:			
				new.append(input)

			if len(current[1]) > 0:
				if len(stack) > 0 and stack[0] == current[1]:
					new.append(current[2] + stack[1:])
				else:
					continue
			else:
				new.append(current[2] + append)

			moves.append(new)

	return moves


# Checks if word already was generated somewhere in past
def is_found(state, input, stack):
	global accept_with
	global acceptable_states

	# Check if all symbols are read
	if len(input) > 0: 
		return 0

	# Check if we accept with empty stack or end state
	if accept_with == "E":
		if len(stack) < 1:  
			return 1

		return 0

	else:
		for i in acceptable_states:
			if i == state: 
				return 1

		return 0


# Reading a file and creating an automaton
def parse_file(filename):
	global productions
	global start_symbol
	global start_stack
	global acceptable_states
	global accept_with

	lines = [line.rstrip() for line in open(filename)]

  # Adding all data to variables for further work
	start_symbol = lines[3]
	start_stack = lines[4]
	acceptable_states.extend(lines[5].split())
	accept_with = lines[6] 

	for i in range(7, len(lines)):
		production = lines[i].split()

		configuration = [(production[1], production[2], production[4], production[3])]

		if not production[0] in productions.keys(): 
			productions[production[0]] = []

		configuration = [tuple(s if s != "e" else "" for s in tup) for tup in configuration]

		productions[production[0]].extend(configuration)


# Confirmation of valid/invalid word.
def done():
	if found:
		print "Accepted" 
	else:
		print "Rejected" 


# Reading from a file
filename = 'data.txt'
parse_file(filename)

start_input = raw_input("Enter a string with 'a', 'b' and 'c':\n")
if not generate(start_symbol, start_input, start_stack, 
                [(start_symbol, start_input, start_stack)]):
  done()
else:
	done()